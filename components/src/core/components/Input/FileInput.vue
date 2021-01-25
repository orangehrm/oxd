<template>
  <input
    type="file"
    ref="input"
    :class="fileInputClasses"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
  />
  <div :class="classes" :style="style" @click="onClick">{{ inputValue }}</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export interface State {
  focused: boolean;
  inputValue: string;
}

export default defineComponent({
  name: 'oxd-file-input',

  props: {
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },

  data(): State {
    return {
      focused: false,
      inputValue: '',
    };
  },

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
      const files = [...((e.target as HTMLInputElement).files || [])];
      this.inputValue = files.map((file: File) => file.name).join(', ');
      this.$emit('input', e);
    },
  },
});
</script>

<style src="./input.scss" lang="scss" scoped></style>
