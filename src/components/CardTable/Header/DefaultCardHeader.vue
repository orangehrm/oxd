<!--
/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */
-->

<template>
  <oxd-card-thead v-if="showHeader">
    <oxd-card-tr :clickable="false">
      <oxd-card-th
        v-if="tableProps.selectable"
        class="oxd-padding-cell oxd-table-th"
        :class="tableProps.selector.class"
        :style="tableProps.selector.style"
      >
        <oxd-checkbox-input
          v-model="selectedAll"
          :check-icon="checkIcon"
          @change="onChangeSelectAll"
        />
      </oxd-card-th>

      <oxd-card-th
        v-for="header in tableProps.headers"
        :key="header"
        class="oxd-padding-cell oxd-table-th"
        :style="header.style"
        :class="header.class"
        :order="tableProps.order[header.sortField]"
        @order="onColumnOrderChanged($event, header)"
      >
        {{ header.title }}
      </oxd-card-th>
    </oxd-card-tr>
  </oxd-card-thead>
</template>

<script lang="ts">
import emitter from '@/utils/emitter';
import type {CardHeader, Order} from '../types';
import {useInjectTableProps} from '@/composables/useCardtable';
import {DEVICE_LG, DEVICE_XL} from '@/composables/useResponsive';
import CheckboxInput from '@/components/Input/CheckboxInput.vue';
import TableRow from '@/components/CardTable/Table/TableRow.vue';
import TableHeader from '@/components/CardTable/Table/TableHeader.vue';
import {defineComponent, reactive, watch, toRefs, computed} from 'vue';
import TableHeaderCell from '@/components/CardTable/Table/TableHeaderCell.vue';

interface State {
  checkIcon: string;
  checkedItems: number[];
  selectedAll: boolean;
}

export default defineComponent({
  name: 'OxdTableHeaderDefault',

  components: {
    'oxd-card-thead': TableHeader,
    'oxd-card-tr': TableRow,
    'oxd-card-th': TableHeaderCell,
    'oxd-checkbox-input': CheckboxInput,
  },

  setup() {
    const {tableProps, screenState} = useInjectTableProps();

    const state: State = reactive({
      checkIcon: 'check',
      checkedItems: [...tableProps.selected],
      selectedAll:
        tableProps.selected.length > 0 &&
        tableProps.selected.length === tableProps.items.length,
    });

    emitter.on(`${tableProps.tableId}-datatable:rowSelected`, (value) => {
      const itemIndex = state.checkedItems.findIndex((item) => item === value);
      if (itemIndex === -1) {
        state.checkedItems.push(value as number);
      }
    });

    emitter.on(`${tableProps.tableId}-datatable:rowUnselected`, (value) => {
      const itemIndex = state.checkedItems.findIndex((item) => item === value);
      if (itemIndex > -1) {
        state.checkedItems.splice(itemIndex, 1);
      }
    });

    watch(
      () => state.checkedItems,
      (newVal) => {
        emitter.emit(`${tableProps.tableId}-datatable:updateSelected`, newVal);
        if (tableProps.items.length > 0 && newVal.length > 0) {
          state.selectedAll = true;
          if (newVal.length === tableProps.items.length) {
            state.checkIcon = 'check';
          } else {
            state.checkIcon = 'dash';
          }
        } else {
          state.selectedAll = false;
        }
      },
      {deep: true},
    );

    const showHeader = computed(() => {
      return (
        screenState.screenType === DEVICE_LG ||
        screenState.screenType === DEVICE_XL
      );
    });

    return {
      ...toRefs(state),
      tableProps,
      screenState,
      showHeader,
    };
  },

  methods: {
    onChangeSelectAll() {
      if (this.selectedAll) {
        emitter.emit(
          `${this.tableProps.tableId}-datatable:selectAll`,
          this.tableProps.items,
        );
      } else {
        emitter.emit(`${this.tableProps.tableId}-datatable:unselectAll`, []);
      }
    },
    onColumnOrderChanged(order: Order, column: CardHeader) {
      const orderFields: Record<string, string> = {};
      for (const key in this.tableProps.order) {
        orderFields[key] = 'DEFAULT';
      }
      if (column.sortField) {
        emitter.emit(`${this.tableProps.tableId}-datatable:updateOrder`, {
          ...orderFields,
          [column.sortField]: order,
        });
      }
    },
  },
});
</script>

<style src="./default-header.scss" lang="scss" scoped></style>
