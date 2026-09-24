<template>
  <div class="oxd-toast-close-container">
    <button type="button" :class="classes" :aria-label="$vt('Close')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {toastMixin} from './toast-mixin';
import translateMixin from '../../../mixins/translate';

export default defineComponent({
  name: 'oxd-toast-close-button',

  // The toast is an aria-live region, so everything in it is spoken. A bare
  // "×" was read out as part of every toast; hide the glyph and name the
  // control instead. WCAG 1.1.1 / 4.1.2.
  // A native <button>, not <div role="button">: the div had no tabindex, so
  // a keyboard user could never reach it to dismiss a persistent toast.
  // Enter/Space fire click, which bubbles to the toast's close handler.
  // WCAG 2.1.1.
  mixins: [toastMixin, translateMixin],

  computed: {
    classes(): object {
      return {
        'oxd-toast-close': true,
        [`oxd-toast-close--${this.type}`]: true,
      };
    },
  },
});
</script>

<style src="./close-button.scss" lang="scss" scoped></style>
