<template>
  <input
    type="file"
    ref="input"
    v-bind="$attrs"
    :class="fileInputClasses"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
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
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {OutputFile} from './types';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export interface State {
  focused: boolean;
  inputValue: string;
}

export default defineComponent({
  name: 'oxd-file-input',
  inheritAttrs: false,

  props: {
    modelValue: {},
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
  },

  components: {
    'oxd-icon': Icon,
  },

  data(): State {
    return {
      focused: false,
      inputValue: '',
    };
  },

  emits: ['click', 'focus', 'blur', 'input', 'update:modelValue'],

  watch: {
    modelValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue !== undefined && newValue !== null) {
          this.inputValue = newValue.name;
        } else {
          this.inputValue = '';
        }
      }
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
            if (base64) {
              const outputFile: OutputFile = {
                name: file.name,
                type: file.type,
                size: file.size,
                base64,
              };
              outputFileArray.push(outputFile);
              if (!i) this.onFilesReadComplete(outputFileArray);
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
