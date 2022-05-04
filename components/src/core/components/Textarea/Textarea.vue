<template>
  <div class="oxd-content-editable-wrapper" :class="classes" :style="style">
    <!-- <textarea
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      :class="classes"
      :style="style"
      :value="modelValue"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
    /> -->
    <div
      class="oxd-content-editable-div"
      contenteditable="true"
      :value="modelValue"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInputNew($event)"
      v-html="
        focused || text
          ? null
          : `<span class='oxd-textarea-placeholder'>${placeholder}</span>`
      "
    ></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

import {
  TextareaResize,
  RESIZE_NONE,
  RESIZE_VERTICAL,
  RESIZE_HORIZONTAL,
} from './types';

export interface State {
  focused: boolean;
  text: string | null;
}

export default defineComponent({
  name: 'oxd-textarea',

  components: {
    'oxd-icon': Icon,
  },

  props: {
    modelValue: {},
    resize: {
      type: String,
      default: RESIZE_VERTICAL,
      validator: function (value: TextareaResize) {
        return (
          [RESIZE_VERTICAL, RESIZE_HORIZONTAL, RESIZE_NONE].indexOf(value) !==
          -1
        );
      },
    },
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'asdasd',
    },
  },

  data: (): State => {
    return {
      focused: false,
      text: '' as string | null,
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-textarea': true,
        'oxd-textarea--active': !this.focused,
        'oxd-textarea--focus': this.focused,
        'oxd-textarea--error': this.hasError,
        [`oxd-textarea--resize-${this.resize}`]: true,
      };
    },
  },

  methods: {
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
      const value = (e.target as HTMLTextAreaElement).value;
      this.$emit('update:modelValue', value);
      this.$emit('input', e);
    },
    onInputNew(e: Event) {
      e.preventDefault();
      const value: string | null = (e.currentTarget as HTMLTextAreaElement)
        .textContent;
      this.text = value;
      this.$emit('update:modelValue', value);
      this.$emit('input', e);
    },
  },
});
</script>

<style src="./textarea.scss" lang="scss" scoped></style>
