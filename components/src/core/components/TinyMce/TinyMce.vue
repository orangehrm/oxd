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
    const tinymceImageTypeValidator = ref();
    const tinymceImageSizeValidator = ref();
    const tinymceId = ref<string>(`oxd-html-editor-${nanoid(6)}`);
    const attachmentSize = props.attachmentSize || 0;
    const attachmentSizeInMb = attachmentSize / (1024 * 1024);

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
        tinymceImageSizeValidator.value = (file: File) => {
          if (!file || !file.size) {
            return true;
          } else {
            if (file.size > attachmentSize) {
              if (typeof editor.image_size_error === 'function') {
                editor.image_size_error();
              }
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
        setTinymceImage.value(files[0]);
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
