<template>
  <div :class="classes" :style="style">
    <span class="oxd-chip-label">{{ label }}</span>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {ButtonType, TYPES, TYPE_MAIN} from './../Button/types';

export default {
  name: 'oxd-chip',

  props: {
    label: {
      type: String,
      required: true,
    },
    displayType: {
      type: String,
      default: TYPE_MAIN,
      validator: function(value: ButtonType) {
        return TYPES.indexOf(value) !== -1;
      },
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
    },
    color: {
      type: String,
    },
  },

  computed: {
    classes() {
      return {
        'oxd-chip': true,
        'oxd-chip--default': !this.transparent,
        'oxd-chip--transparent': this.transparent,
        [`oxd-button--${this.displayType}`]: true,
      };
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
        color: this.color,
      };
    },
  },
};
</script>

<style src="./chip.scss" lang="scss" scoped></style>
