<template>
  <div class="oxd-toast-close-container">
    <div :class="classes" role="button" :aria-label="$vt('Close')">
      <span aria-hidden="true">×</span>
    </div>
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
