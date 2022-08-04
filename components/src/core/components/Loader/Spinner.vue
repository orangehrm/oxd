<template>
  <div :class="classes">
    <div class="oxd-loading-spinner"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-loading-spinner',

  props: {
    withContainer: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-loading-spinner-container': this.withContainer,
        'oxd-loading-spinner-container--block': !this.withContainer,
      };
    },
  },
});
</script>

<style src="./spinner.scss" lang="scss" scoped></style>
