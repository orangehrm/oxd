<template>
  <div class="oxd-table-card-cell">
    <slot name="body" :header="header" :cell="item" :row="rowItem"></slot>
    <div class="data" v-if="!$slots['body']">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {cellMixin} from './cell-mixin';

export default defineComponent({
  name: 'oxd-table-cell-default',
  mixins: [cellMixin],
});
</script>

<style src="./default.scss" lang="scss" scoped></style>
