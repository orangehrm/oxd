<template>
  <button type="button" :class="classes" @click="onClick" :style="style">
    {{ label }}
  </button>
</template>

<script lang="ts">
import {ButtonSize, SIZE_SMALL, SIZE_MEDIUM, SIZE_LARGE} from './types';

export default {
  name: 'oxd-button',

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: SIZE_MEDIUM,
      validator: function(value: ButtonSize) {
        return [SIZE_SMALL, SIZE_MEDIUM, SIZE_LARGE].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  computed: {
    classes() {
      return {
        'oxd-button': true,
        'oxd-button--primary': this.primary,
        'oxd-button--secondary': !this.primary,
        [`oxd-button--${this.size}`]: true,
      };
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
  },

  methods: {
    onClick(e: Event) {
      this.$emit('click', e);
    },
  },
};
</script>

<style src="./button.scss" lang="scss" scoped></style>
