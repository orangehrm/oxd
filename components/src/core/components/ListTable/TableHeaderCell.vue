<template>
  <div class="oxd-table-header-cell" role="columnheader">
    <oxd-skeleton v-if="loading" animateHighlighted></oxd-skeleton>
    <template v-else>
      <slot></slot>
      <oxd-card-th-sort
        v-if="order !== undefined"
        :order="order"
        @order="onOrder"
      ></oxd-card-th-sort>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Order} from '../CardTable/types';
import TableHeaderSortDropdown from '../CardTable/Table/TableHeaderSortDropdown.vue';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';

export default defineComponent({
  name: 'oxd-card-th',

  props: {
    order: {
      type: Object,
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    customStyles: {
      type: Object,
      default: () => ({}),
    },
  },

  emits: ['order'],

  components: {
    'oxd-card-th-sort': TableHeaderSortDropdown,
    'oxd-skeleton': Skeleton,
  },

  methods: {
    onOrder(order: Order) {
      this.$emit('order', order);
    },
  },
});
</script>

<style src="./table-header-cell.scss" lang="scss" scoped></style>
