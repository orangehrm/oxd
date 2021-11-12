<template>
  <oxd-card-td
    :class="$attrs.class"
    v-for="header in headers"
    :key="header"
    :style="header.style"
  >
    <component
      :is="header.cellType ? header.cellType : 'oxd-table-cell-default'"
      :item="items[header.name]"
      :header="header"
      :rowItem="items"
      :options="items['options']"
    />
  </oxd-card-td>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import TableDataCell from '@orangehrm/oxd/core/components/CardTable/Table/TableDataCell.vue';
import DefaultCell from './Default.vue';
import ActionsCell from './Actions.vue';
import CheckboxCell from './Checkbox.vue';
import DropdownInput from './../../Input/DropdownInput.vue';
import {CardHeaders} from '../types';
import {RowItem} from './types';

export default defineComponent({
  name: 'oxd-table-cell-container',

  components: {
    'oxd-card-td': TableDataCell,
    'oxd-table-cell-default': DefaultCell,
    'oxd-table-cell-actions': ActionsCell,
    'oxd-table-cell-checkbox': CheckboxCell,
    'oxd-table-cell-dropdown': DropdownInput,
  },

  props: {
    headers: {
      type: Array as PropType<CardHeaders>,
      default: () => [],
    },
    items: {
      type: Object as PropType<RowItem>,
      default: () => ({}),
    },
  },
});
</script>
