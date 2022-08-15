<template>
  <div>
    <div class="oxd-download-box-outer-wrapper" v-if="inputFile.name">
      <div class="oxd-download-box-wrapper d-flex">
        <button class="oxd-download-box" @click="downloadBoxClick()" type="button">
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
          v-if="!(disabled  || readonly)"
        >
          <oxd-radio-input
            v-model="selectedItem"
            id="check1"
            value="keep"
            optionLabel="Keep Current"
          />
          <oxd-radio-input
            v-model="selectedItem"
            id="check2"
            value="delete"
            optionLabel="Delete Current"
          />
          <oxd-radio-input
            v-model="selectedItem"
            id="check3"
            value="replace"
            optionLabel="Replace Current"
          />
        </div>
      </div>
    </div>
    <div v-if="selectedItem === 'replace' || !inputFile.name">
      <input
        type="file"
        ref="input"
        v-bind="$attrs"
        :class="fileInputClasses"
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
          <div class="oxd-file-input-div">
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
import {InputFile, OutputFile} from './types';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Radio from '@orangehrm/oxd/core/components/Input/RadioInput.vue';

export interface State {
  focused: boolean;
  inputValue: string;
  selectedItem: string;
}

export default defineComponent({
  name: 'oxd-file-input',
  components: {
    'oxd-icon': Icon,
    'oxd-radio-input': Radio,
  },
  inheritAttrs: false,
  props: {
    modelValue: {},
    inputFile: {
      type: Object as PropType<InputFile>,
      default: {}
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
  data(): State {
    return {
      focused: false,
      inputValue: '',
      selectedItem: 'keep',
    };
  },

  emits: [
    'click',
    'focus',
    'blur',
    'input',
    'update:modelValue',
    'selectedOption',
  ],

  watch: {
    modelValue(newValue, oldValue) {
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
    selectedItem() {
      this.$emit('selectedOption', this.selectedItem);
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
        const fileStatus = this.inputFile.name? this.selectedItem : "replace";
        this.$emit('update:modelValue', [{ fileStatus: fileStatus}]);
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
            if (base64) {
              const outputFile: OutputFile = {
                name: file.name,
                type: file.type,
                size: file.size,
                base64
              };

              outputFile.fileStatus = this.inputFile.name? this.selectedItem : "replace";

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
  },
});
</script>

<style src="./file-input.scss" lang="scss" scoped></style>
