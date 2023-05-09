<template>
  <div class="oxd-table-card-cell">
    <div class="header" v-if="showHeader">
      <slot name="header" :header="header" :cell="item" :row="rowItem"></slot>
      <template v-if="!$slots['header']">
        {{ header.title }}
      </template>
    </div>
    <slot name="body" :header="header" :cell="item" :row="rowItem"></slot>
    <div class="data" v-if="!$slots['body']">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {cellMixin} from './cell-mixin';
import {DEVICE_LG, DEVICE_XL} from '../../../../composables/useResponsive';

export default defineComponent({
  name: 'oxd-table-cell-default',

  mixins: [cellMixin],

  computed: {
    showHeader(): boolean {
      return !(
        this.screenState.screenType === DEVICE_LG ||
        this.screenState.screenType === DEVICE_XL
      );
    },
  },
});
</script>

<style src="./default.scss" lang="scss" scoped></style>
