<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

/**
 * The overlay is a backdrop, so it carries no role. It holds none of the
 * dialog's content and never receives the consumer's naming attributes, so the
 * role="dialog" it used to hardcode only added a second, empty dialog to the
 * tree — and one on every non-dialog backdrop too, such as the layout's. The
 * element that owns the content declares the role instead.
 */
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
