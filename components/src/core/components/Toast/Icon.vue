<template>
  <div class="oxd-toast-icon-container" aria-hidden="true">
    <div :class="iconWrapClasses">
      <oxd-icon :name="iconName" class="oxd-toast-icon d-flex align-center" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {toastMixin} from './toast-mixin';
import {ToastType, ICON_MAP} from './types';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'oxd-toast-icon',

  // The icon is drawn as ::before content from a private-use codepoint
  // (U+F333 for exclamation-circle). Inside the toast's aria-live region
  // screen readers spoke that codepoint before the message, so the icon is
  // aria-hidden; the toast title already says what it means. WCAG 1.1.1.

  mixins: [toastMixin],

  components: {
    'oxd-icon': Icon,
  },

  computed: {
    iconWrapClasses(): object {
      return {
        'oxd-toast-icon-wrap': true,
        [`oxd-toast-icon-wrap--${this.type}`]: true,
      };
    },
    iconName(): string {
      return ICON_MAP[this.type as ToastType];
    },
  },
});
</script>

<style src="./icon.scss" lang="scss" scoped></style>
