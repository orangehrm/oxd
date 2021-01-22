<template>
  <textarea
    :class="classes"
    :style="style"
    :value="label"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script lang="ts">
import {
  TextareaResize,
  RESIZE_NONE,
  RESIZE_VERTICAL,
  RESIZE_HORIZONTAL,
} from './types';

export default {
  name: 'oxd-textarea',

  props: {
    label: {
      type: String,
      required: true,
    },
    resize: {
      type: String,
      default: RESIZE_VERTICAL,
      validator: function(value: TextareaResize) {
        return (
          [RESIZE_VERTICAL, RESIZE_HORIZONTAL, RESIZE_NONE].indexOf(value) !==
          -1
        );
      },
    },
    style: {
      type: Object,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      focused: false,
    };
  },

  computed: {
    classes() {
      return {
        'oxd-textarea': true,
        'oxd-textarea--active': !this.focused,
        'oxd-textarea--focus': this.focused,
        'oxd-textarea--error': this.error,
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
  },
};
</script>

<style src="./textarea.scss" lang="scss" scoped></style>
