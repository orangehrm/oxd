<template>
  <div role="dialog" :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-overlay',

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    centered: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-overlay': true,
        'oxd-overlay--flex': true,
        'oxd-overlay--flex-centered': this.centered,
        'oxd-overlay--hide': !this.show,
      };
    },
  },
});
</script>

<style src="./overlay.scss" lang="scss" scoped></style>
