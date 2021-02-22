<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {SheetType, TYPES, TYPE_WHITE} from './types';

export default defineComponent({
  name: 'oxd-sheet',

  props: {
    type: {
      type: String,
      default: TYPE_WHITE,
      validator: function(value: SheetType) {
        return TYPES.indexOf(value) !== -1;
      },
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    gutters: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-sheet': true,
        'oxd-sheet--rounded': this.rounded,
        'oxd-sheet--gutters': this.gutters,
        [`oxd-sheet--${this.type}`]: true,
      };
    },
  },
});
</script>

<style src="./sheet.scss" lang="scss" scoped></style>
