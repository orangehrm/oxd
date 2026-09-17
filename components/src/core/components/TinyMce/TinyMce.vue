<template>
  <div class="oxd-html-editor" :class="classes">
    <editor
      :id="id"
      v-model="editorValue"
      :init="processedSettings"
      :disabled="disabled"
      @selectionChange="onInput"
      @blur="onBlur"
    />
    <input
      v-show="false"
      :id="`tinymce-input-${tinymceId}`"
      type="file"
      @change="onChangeFile"
    />
    <div class="tinymce-helper-text">
      {{ $vt('Press Shift + Enter for a new line') }}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, toRefs, PropType, computed, watch} from 'vue';

// TinyMCE
import 'tinymce/tinymce';
import * as tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern';
// TinyMCE plugins
import 'tinymce/plugins/advlist/plugin';
import 'tinymce/plugins/anchor/plugin';
import 'tinymce/plugins/autolink/plugin';
import 'tinymce/plugins/autoresize/plugin';
import 'tinymce/plugins/colorpicker/plugin';
import 'tinymce/plugins/emoticons/plugin';
import 'tinymce/plugins/hr/plugin';
import 'tinymce/plugins/image/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/lists/plugin';
import 'tinymce/plugins/nonbreaking/plugin';
import 'tinymce/plugins/pagebreak/plugin';
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/preview/plugin';
import 'tinymce/plugins/print/plugin';
import 'tinymce/plugins/searchreplace/plugin';
import 'tinymce/plugins/table/plugin';
import 'tinymce/plugins/textcolor/plugin';
import 'tinymce/plugins/wordcount/plugin';
import 'tinymce/plugins/contextmenu/plugin';
import 'tinymce/plugins/wordcount/plugin';
import Editor from '@tinymce/tinymce-vue';
import {nanoid} from 'nanoid';
import translateMixin from '../../../mixins/translate';

import * as contentUiCssURL from '!!raw-loader!./skins/lightgray/content.module.css';

export default defineComponent({
  name: 'App',
  components: {
    editor: Editor,
  },
  mixins: [translateMixin],
  emits: ['update:modelValue', 'onBlur'],
  // NOT routed to the control, unlike TimeInput and Number. tinymce-vue renders
  // a <textarea> that TinyMCE then hides and replaces with its own UI, and the
  // editable region is a contenteditable body inside an IFRAME. aria-describedby
  // and aria-labelledby are IDREFs, which cannot cross a document boundary, so
  // forwarding them to either the textarea or the <editor> element would look
  // like a fix and reach nobody. The attributes stay on the wrapper.
  //
  // Naming and describing the editable area has to go through TinyMCE's own
  // init options, which is a separate piece of work.
  props: {
    id: {
      type: String as PropType<string>,
      default: 'oxd-tinymce-editor',
    },
    modelValue: {
      type: String as PropType<string>,
      default: '',
    },
    attachmentSize: {
      type: Number as PropType<number>,
      default: 5000000,
    },
    allowedFileTypes: {
      type: Array as PropType<string[]>,
      default: () => [
        'image/gif',
        'image/jpeg',
        'image/jpg',
        'image/pjpeg',
        'image/png',
        'image/x-png',
      ],
    },
    hasError: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    configurations: {
      type: Object,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props: any, {emit}: any) {
    const {modelValue} = toRefs(props);
    const editorValue = ref(modelValue.value);
    const seonderyTooltbar = ref();
    const fileInput = ref();
    const setTinymceImage = ref();
    let setTinymceBackGroundImage;
    const tinymceImageTypeValidator = ref();
    const tinymceImageSizeValidator = ref();
    const tinymceId = ref<string>(`oxd-html-editor-${nanoid(6)}`);
    const attachmentSize = props.attachmentSize || 0;
    const attachmentSizeInMb = attachmentSize / (1024 * 1024);
    const imageUploadForBackgound = ref(false);

    /*eslint-disable */
    const initialObject: any = {
      height: 500,
      selector: '.tinymce',
      theme: 'modern',
      plugins:
        'advlist,anchor,autolink,autoresize,colorpicker,emoticons,hr,image,link,nonbreaking,pagebreak,paste,preview,print,searchreplace,table,textcolor,wordcount,contextmenu,lists',
      fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
      toolbar1:
        'toggleToolbar | fontselect fontsizeselect | bold italic | bullist numlist outdent indent ',
      toolbar2:
        'undo redo | link image image-upload | alignleft aligncenter alignright alignjustify | forecolor backcolor ',
      image_advtab: true,
      browser_spellcheck: true,
      paste_as_text: true,
      paste_data_images: true,
      autoresize_max_height: 500,
      contextmenu_never_use_native: true,
      // content_css: false,
      content_style: contentUiCssURL.default,
      setup(editor: any) {
        editor.image_type_error = () => {
          emit('tinymce:errror-image-type');
        };
        editor.image_size_error = () => {
          emit('tinymce:errror-image-size', attachmentSizeInMb);
        };
        editor.allowed_file_types = () => {
          return props.allowedFileTypes;
        };
        emit('tinymce:editor-ready', editor);
        setTinymceImage.value = (file: File) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            editor.execCommand(
              'mceInsertContent',
              false,
              '<img src="' + reader.result + '"/>',
            );
          };
          reader.onerror = (error: any) => {};
        };

        setTinymceBackGroundImage = (file: File) => {
          imageUploadForBackgound.value = false;
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            const image = new Image();
            image.src = reader.result;
            image.onload = function () {
              let height = this.height;
              let existingContent = editor.getContent();
              let newContent = existingContent;
              let tempDiv = document.createElement('div');
              tempDiv.innerHTML = existingContent;
              if (tempDiv.firstChild?.classList.contains('background-image')) {
                let existingChildren = '';
                const children = tempDiv.firstChild.children;

                Array.from(children).forEach((item) => {
                  existingChildren += item.outerHTML;
                });
                if (existingChildren.trim() === '') {
                  existingChildren = '<p>&nbsp;</p>';
                }
                newContent = '<div id="backgroundImage" class="background-image" style="background-repeat: no-repeat; background-image: url(\'' + reader.result + '\'); min-height: ' + height + 'px " data-src="' + reader.result + '">' + existingChildren + '</div>';
              } else {
                if (existingContent == "") {
                  existingContent = "<p>&nbsp;</p>";
                }
                newContent = '<div id="backgroundImage" class="background-image" style="background-repeat: no-repeat; background-image: url(\'' + reader.result + '\'); min-height: ' + height + 'px " data-src="' + reader.result + '">' + existingContent + '</div>';
              }
              editor.setContent('');
              editor.execCommand('mceReplaceContent', false, newContent);
              clearInputField();
            }
          };
          reader.onerror = (error: any) => { };
        };
        tinymceImageSizeValidator.value = (file: File) => {
          if (!file || !file.size) {
            return true;
          } else {
            if (file.size > attachmentSize) {
              if (typeof editor.image_size_error === 'function') {
                editor.image_size_error();
              }
              imageUploadForBackgound.value = false;
              clearInputField();
              return false;
            }
            return true;
          }
        };
        tinymceImageTypeValidator.value = (file: File) => {
          if (!file) {
            return true;
          } else {
            if (
              (file &&
                file.type &&
                props.allowedFileTypes.indexOf(file.type) === -1) ||
              (file && !file.type)
            ) {
              if (typeof editor.image_type_error === 'function') {
                editor.image_type_error();
              }
              imageUploadForBackgound.value = false;
              clearInputField();
              return false;
            }
            return true;
          }
        };

        editor.addButton('image-upload', {
          tooltip: 'Upload image',
          icon: 'browse',
          onclick() {
            fileInput.value.click();
          },
        });
        editor.addButton('toggleToolbar', {
          icon: 'mce-ico mce-i-settings',
          tooltip: 'Toggle Toolbar',
          onclick() {
            seonderyTooltbar.value.classList.toggle('d-none');
          },
        });
        editor.addButton('background-upload', {
          tooltip: 'Upload background image',
          icon: 'upload-bg',
          onclick() {
            imageUploadForBackgound.value = true;
            fileInput.value.click();
          }
        });
        editor.addButton('background-remove', {
          tooltip: 'Remove background image',
          icon: 'remove-bg',
          onclick() {
            removeTinymceBackgroundImage();
          }
        });

        const clearInputField = () => {
          let inputField= document.querySelector(
              `#tinymce-input-${tinymceId.value}`,
          );
          if(inputField){
            const parent = inputField.parentNode;
            const newFileInput = inputField.cloneNode(true); // Clone the original input
            newFileInput.value = ''; // Ensure the new input is reset
            parent.replaceChild(newFileInput, inputField);
          }
        }

        const removeTinymceBackgroundImage = () => {
          let existingContent = editor.getContent();
          let tempDiv = document.createElement('div');
          tempDiv.innerHTML = existingContent;
          if (tempDiv.firstChild?.classList.contains('background-image') ||
              (tempDiv.firstChild?.nodeType === 1 && tempDiv.firstChild?.style.backgroundImage && tempDiv.firstChild?.style.backgroundImage !== 'none')) {
            let existingChildren = '';
            const children = tempDiv.firstChild.children;

            Array.from(children).forEach((item) => {
              existingChildren += item.outerHTML;
            });
            editor.setContent('');
            editor.execCommand('mceReplaceContent', false, existingChildren);
          }
        };
      },
      init_instance_callback() {
        seonderyTooltbar.value = document.querySelector(
          `.mce-toolbar.mce-stack-layout-item.mce-last`,
        );
        seonderyTooltbar.value.classList.add('d-none');
        fileInput.value = document.querySelector(
          `#tinymce-input-${tinymceId.value}`,
        );
      },
    };

    const processedSettings = computed(() => {
      for (const key in props.configurations) {
        const value = props.configurations[key];
        if (value) {
          initialObject[key] = value;
        }
      }
      return initialObject;
    });

    const classes = computed(() => {
      return {
        'oxd-tinymce-input--error': props.hasError,
        'oxd-tinymce-input--disabled': props.disabled,
      };
    });

    const onChangeFile = (e: any) => {
      const files = e.target?.files;
      if (
        files[0] &&
        tinymceImageTypeValidator.value(files[0]) &&
        tinymceImageSizeValidator.value(files[0])
      ) {
        if (imageUploadForBackgound.value) {
          setTinymceBackGroundImage && setTinymceBackGroundImage(files[0]);
        } else {
          setTinymceImage.value(files[0]);
        }
      }
    };

    const onBlur = () => {
      emit('onBlur');
    };

    const onInput = () => {
      const content = tinymce.get(props.id).getContent();
      if (content.trim() === '') {
        emit('update:modelValue', content);
      }
    };

    watch(modelValue, (newValue: string) => {
      editorValue.value = newValue;
    });

    watch(editorValue, (newValue: string) => {
      emit('update:modelValue', newValue);
    });

    return {
      editorValue,
      tinymceId,
      onChangeFile,
      onInput,
      onBlur,
      classes,
      processedSettings,
    };
  },
});
</script>

<style lang="scss">
@import './tinymce.scss';
</style>
