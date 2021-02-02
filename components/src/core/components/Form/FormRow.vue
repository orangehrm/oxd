<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'oxd-form-row',

  computed: {
    classes() {
      return {
        'oxd-form-row': true,
      };
    },
  },
};
</script>

<style src="./form.scss" lang="scss" scoped></style>
