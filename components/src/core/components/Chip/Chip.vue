<template>
  <span :class="classes" :style="style">
    {{ label }}
  </span>
</template>

<script lang="ts">
export default {
  name: 'oxd-chip',

  props: {
    label: {
      type: String,
      required: true,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
    },
  },

  computed: {
    classes() {
      return {
        'oxd-chip': true,
        'oxd-chip--default': !this.transparent,
        'oxd-chip--transparent': this.transparent,
      };
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
  },
};
</script>

<style src="./chip.scss" lang="scss" scoped></style>
