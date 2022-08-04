<template>
  <div class="oxd-toast-close-container">
    <div :class="classes" role="button">
      ×
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {toastMixin} from './toast-mixin';

export default defineComponent({
  name: 'oxd-toast-close-button',

  mixins: [toastMixin],

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
