<template>
  <div class="oxd-toast-icon-container">
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
