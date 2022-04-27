<template>
  <div class="oxd-table-header-cell" role="columnheader">
    <slot></slot>
    <oxd-card-th-sort
      v-if="order !== undefined"
      :order="order"
      @order="onOrder"
    ></oxd-card-th-sort>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Order} from '../types';
import TableHeaderSortDropdown from './TableHeaderSortDropdown.vue';

export default defineComponent({
  name: 'oxd-card-th',

  props: {
    order: {
      type: Object,
      required: false,
    },
  },

  emits: ['order'],

  components: {
    'oxd-card-th-sort': TableHeaderSortDropdown,
  },

  methods: {
    onOrder(order: Order) {
      this.$emit('order', order);
    },
  },
});
</script>

<style src="./table-header-cell.scss" lang="scss" scoped></style>
