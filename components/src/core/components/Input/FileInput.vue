<template>
  <input
    type="file"
    ref="input"
    :class="fileInputClasses"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
  />
  <div :class="classes" :style="style" @click="onClick">
    <div class="oxd-file-button" v-if="buttonLabel">{{ buttonLabel }}</div>
    <div class="oxd-file-input-div">{{ inputValue }}</div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {OutputFile} from './types';

export interface State {
  focused: boolean;
  inputValue: string;
}

export default defineComponent({
  name: 'oxd-file-input',

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
  },

  data(): State {
    return {
      focused: false,
      inputValue: '',
    };
  },

  emits: ['click', 'focus', 'blur', 'input', 'update:modelValue'],

  computed: {
    classes(): object {
      return {
        'oxd-input': true,
        'oxd-file-div': true,
        'oxd-input--active': !this.focused,
        'oxd-input--focus': this.focused,
        'oxd-input--error': this.hasError,
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
        // Not supporting with multiple (i.e. <input type="file" multiple>)
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (
            typeof event.target?.result === 'string' ||
            event.target?.result instanceof String
          ) {
            const base64 = event.target?.result.split(',').pop();
            if (base64) {
              const outputFile: OutputFile = {
                name: files[0].name,
                type: files[0].type,
                size: files[0].size,
                base64,
              };
              this.inputValue = inputValue;
              this.$emit('update:modelValue', outputFile);
            }
          }
        };
        reader.readAsDataURL(files[0]);
      } else {
        this.inputValue = inputValue;
        this.$emit('update:modelValue', null);
      }

      this.$emit('input', e);
    },
  },
});
</script>

<style src="./input.scss" lang="scss" scoped></style>
