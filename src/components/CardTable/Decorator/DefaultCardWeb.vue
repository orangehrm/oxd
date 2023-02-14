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
  <oxd-card-tbody>
    <div
      v-for="(item, index) in items"
      :key="JSON.stringify(item)"
      :class="classes"
      @click="onClick(item)($event)"
    >
      <oxd-card-tr :clickable="tableProps.clickable">
        <oxd-card-cell
          class="oxd-padding-cell"
          :headers="defaultSlot"
          :items="item"
          :index="index"
        ></oxd-card-cell>
      </oxd-card-tr>
    </div>
  </oxd-card-tbody>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import emitter from '@/utils/emitter';
import type {CardHeader, RowItem} from '../types';
import {useInjectTableProps} from '@/composables/useCardtable';
import TableBody from '@/components/CardTable/Table/TableBody.vue';
import TableRow from '@/components/CardTable/Table/TableRow.vue';
import DefaultCellContainer from '@/components/CardTable/Cell/DefaultCellContainer.vue';

export default defineComponent({
  name: 'OxdTableDefaultCardWeb',

  components: {
    'oxd-card-tbody': TableBody,
    'oxd-card-tr': TableRow,
    'oxd-card-cell': DefaultCellContainer,
  },

  setup() {
    return {
      ...useInjectTableProps(),
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-table-card': true,
      };
    },
    defaultSlot(): Array<CardHeader> {
      if (this.tableProps.selectable) {
        return [
          {
            name: 'selector',
            cellType: 'oxd-table-cell-checkbox',
            class: this.tableProps.selector?.class,
            style: this.tableProps.selector?.style,
          },
          ...this.tableProps.headers,
        ];
      }
      return this.tableProps.headers;
    },
    items(): Array<object> {
      return this.tableProps.items.map((item: RowItem, index: number) => {
        return this.tableProps.selectable
          ? {selector: index, ...item}
          : {...item};
      });
    },
  },

  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick(item: any) {
      return (e: Event) => {
        emitter.emit(`${this.tableProps.tableId}-datatable:clickRow`, {
          item,
          native: e,
        });
      };
    },
  },
});
</script>

<style src="./card.scss" lang="scss" scoped></style>
