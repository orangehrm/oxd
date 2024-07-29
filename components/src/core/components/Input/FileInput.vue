<template>
  <div>
    <div class="oxd-download-box-outer-wrapper" v-if="inputFile.name">
      <div class="oxd-download-box-wrapper d-flex">
        <button
          class="oxd-download-box"
          @click="downloadBoxClick()"
          type="button"
        >
          <div class="oxd-download-box-doc-icon d-flex">
            <oxd-icon :name="'oxd-file-doc'"> </oxd-icon>
          </div>
          <div class="oxd-download-box-download-data d-flex">
            <div class="oxd-download-box-download-text">
              {{ inputFile.name }}
            </div>
            <div class="oxd-download-box-download-icon">
              <oxd-icon :name="'oxd-simple-download'" :size="'xxx-small'" />
            </div>
          </div>
        </button>
        <div
          class="oxd-download-box-radio-buttons"
          v-if="!(disabled || readonly)"
        >
          <oxd-radio-input
            v-model="fileUpdateMode"
            id="check1"
            value="keep"
            :optionLabel="$vt('Keep Current')"
          />
          <oxd-radio-input
            v-if="deletable"
            v-model="fileUpdateMode"
            id="check2"
            value="delete"
            :optionLabel="$vt('Delete Current')"
          />
          <oxd-radio-input
            v-model="fileUpdateMode"
            id="check3"
            value="replace"
            :optionLabel="$vt('Replace Current')"
          />
        </div>
      </div>
    </div>
    <div v-if="fileUpdateMode === 'replace' || !inputFile.name">
      <input
        type="file"
        ref="input"
        v-bind="$attrs"
        :class="fileInputClasses"
        :disabled="disabled"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @keyup.esc.stop
      />
      <div :class="classes" :style="style" @click="onClick">
        <slot></slot>
        <template v-if="!$slots.default">
          <div
            v-if="buttonLabel"
            :class="{'oxd-file-button': true, '--disabled': disabled}"
          >
            {{ buttonLabel }}
          </div>
          <div
            :class="{'oxd-file-input-div': true, '--placeholder': !inputValue}"
          >
            {{ inputValue ? inputValue : placeholder }}
          </div>
          <oxd-icon
            :class="{'oxd-file-input-icon': true, '--disabled': disabled}"
            :name="buttonIcon"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {
  ATTACHMENT_UPDATE_MODE_KEEP,
  FileUpdateMode,
  FILE_UPDATE_MODES,
  OutputFile,
} from './types';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Radio from '@orangehrm/oxd/core/components/Input/RadioInput.vue';
import translateMixin from '../../../mixins/translate';

export interface State {
  focused: boolean;
  inputValue: string;
  fileUpdateMode: string;
}

export default defineComponent({
  name: 'oxd-file-input',
  components: {
    'oxd-icon': Icon,
    'oxd-radio-input': Radio,
  },
  mixins: [translateMixin],
  inheritAttrs: false,
  props: {
    modelValue: {},
    inputFile: {
      type: Object as PropType<OutputFile>,
      default: () => ({}),
    },
    initialFileUpdateMode: {
      type: String as PropType<string>,
      default: ATTACHMENT_UPDATE_MODE_KEEP,
      validator: function(value: FileUpdateMode) {
        return FILE_UPDATE_MODES.indexOf(value) !== -1;
      },
    },
    deletable: {
      type: Boolean,
      default: true,
    },
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    buttonLabel: {
      type: String,
    },
    buttonIcon: {
      type: String,
      default: 'upload',
    },
    placeholder: {
      type: String,
      default: 'No file chosen',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    downloadBoxClick: {
      type: Function,
      required: false,
    },
  },
  beforeMount() {
    if (this.inputFile.name) {
      this.setModelValue();
    }
    this.setInitialFileUpdateMode();
  },
  data(): State {
    return {
      focused: false,
      inputValue: '',
      fileUpdateMode: '',
    };
  },

  emits: [
    'click',
    'focus',
    'blur',
    'input',
    'update:modelValue',
    'fileUpdateMode',
  ],

  watch: {
    modelValue: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          if (newValue !== undefined && newValue !== null) {
            this.inputValue = Array.isArray(newValue)
              ? newValue[0].name
              : newValue.name;
          } else {
            this.inputValue = '';
          }
        }
      },
    },
    fileUpdateMode() {
      if (this.inputFile.name) {
        this.setModelValue();
      }
      this.setFileUpdateMode();
    },
    inputFile() {
      this.setModelValue();
      this.setInitialFileUpdateMode();
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-file-div': true,
        'oxd-file-div--active': !this.focused,
        'oxd-file-div--focus': this.focused,
        'oxd-file-div--error': this.hasError,
        'oxd-file-div--disabled': this.disabled,
        'oxd-file-div--readonly': this.readonly,
      };
    },
    fileInputClasses(): object {
      return {
        'oxd-file-input': true,
      };
    },
  },
  methods: {
    onClick(e: Event) {
      if (this.disabled || this.readonly) return;
      const inputRef = this.$refs.input as HTMLInputElement;
      inputRef.focus();
      inputRef.click();
      this.$emit('click', e);
    },
    onFocus(e: Event) {
      this.focused = true;
      this.$emit('focus', e);
    },
    onBlur(e: Event) {
      this.focused = false;
      this.$emit('blur', e);
    },
    onInput(e: Event) {
      e.preventDefault();
      const files = [...((e.target as HTMLInputElement).files || [])];
      const inputValue = files.map((file: File) => file.name).join(', ');

      if (files.length > 0) {
        this.readFiles(files);
        this.inputValue = inputValue;
      } else {
        this.inputValue = inputValue;
        this.$emit('update:modelValue', null);
      }

      this.$emit('input', e);
    },
    readFiles(files: Array<File>) {
      const count = files.length;
      const outputFileArray: OutputFile[] = [];
      for (let i = count - 1; i >= 0; i--) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (
            typeof event.target?.result === 'string' ||
            event.target?.result instanceof String
          ) {
            const base64 = event.target?.result.split(',').pop();
            if (base64 !== undefined || base64 !== null) {
              const outputFile: OutputFile = {
                name: file.name,
                type: file.type,
                size: file.size,
                base64,
                ...(this.inputFile.name && {
                  fileUpdateMode: this.fileUpdateMode,
                }),
              };

              outputFileArray.push(outputFile);
              if (outputFileArray.length === files.length)
                this.onFilesReadComplete(outputFileArray);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    },
    onFilesReadComplete(files: OutputFile[]) {
      this.$emit('update:modelValue', files);
    },
    setModelValue() {
      const modelArr = [
        {
          name: null,
          type: null,
          size: null,
          fileUpdateMode: this.fileUpdateMode,
        },
      ];
      this.$emit('update:modelValue', modelArr);
      this.inputValue = '';
    },
    setInitialFileUpdateMode() {
      if (this.inputFile.name) {
        this.fileUpdateMode = this.initialFileUpdateMode;
        this.$emit('fileUpdateMode', this.fileUpdateMode);
      } else {
        this.fileUpdateMode = null;
        this.$emit('fileUpdateMode', this.fileUpdateMode);
      }
    },
    setFileUpdateMode() {
      if (this.inputFile.name) {
        this.$emit('fileUpdateMode', this.fileUpdateMode);
      } else {
        this.fileUpdateMode = null;
        this.$emit('fileUpdateMode', this.fileUpdateMode);
      }
    },
  },
});
</script>

<style src="./file-input.scss" lang="scss" scoped></style>
