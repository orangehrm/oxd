<template>
  <component :is="card"></component>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import DefaultCardMobile from '@orangehrm/oxd/core/components/CardTable/Decorator/DefaultCardMobile.vue';
import DefaultCardWeb from '@orangehrm/oxd/core/components/CardTable/Decorator/DefaultCardWeb.vue';
import {DEVICE_LG, DEVICE_XL} from '../../../../composables/useResponsive';

export default defineComponent({
  name: 'oxd-table-default-card-container',
  inject: ['screenState'],
  components: {
    'oxd-table-default-card-web': DefaultCardWeb,
    'oxd-table-default-card-mobile': DefaultCardMobile,
  },
  computed: {
    card(): string {
      if (
        this.screenState.screenType === DEVICE_LG ||
        this.screenState.screenType === DEVICE_XL
      ) {
        return 'oxd-table-default-card-web';
      } else {
        return 'oxd-table-default-card-mobile';
      }
    },
  },
});
</script>
