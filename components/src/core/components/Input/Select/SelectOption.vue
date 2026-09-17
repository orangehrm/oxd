<template>
  <div
    @mousedown="onClick"
    role="option"
    :aria-selected="selected ? 'true' : 'false'"
    class="oxd-select-option"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-select-option',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    // role="option" without aria-selected leaves the reader unable to say
    // which entry is the current one.
    selected: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['select'],

  methods: {
    onClick() {
      if (this.disabled) return;
      this.$emit('select');
    },
  },
});
</script>

<style src="./select-input.scss" lang="scss" scoped></style>
