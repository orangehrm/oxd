<template>
  <div class="oxd-table-header-cell" role="columnheader">
    <slot></slot>
    <oxd-icon-button
      v-if="sort"
      :withContainer="false"
      :name="sortIcon"
      class="oxd-table-header-cell-sorticon"
      @click="$emit('sort', sort)"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {Sort} from '../types';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';

export default defineComponent({
  name: 'oxd-card-th',

  props: {
    sort: {
      type: Object as PropType<Sort>,
      required: false,
    },
  },

  emits: ['sort'],

  components: {
    'oxd-icon-button': IconButton,
  },

  computed: {
    sortIcon(): string {
      let icon = '';
      if (this.sort) {
        switch (this.sort.state) {
          case 'asc':
            icon = 'sort-alpha-up';
            break;
          case 'desc':
            icon = 'sort-alpha-down';
            break;
          case 'none':
            icon = '';
            break;
          default:
            icon = 'arrow-down-up';
            break;
        }
      }
      return icon;
    },
  },
});
</script>

<style src="./table-header-cell.scss" lang="scss" scoped></style>
