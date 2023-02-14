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
  <oxd-table>
    <colgroup>
      <col v-if="selectable" :style="{width: selector.width}" />
      <col
        v-for="header in headers"
        :key="JSON.stringify(header)"
        :style="{width: header.width}"
      />
    </colgroup>
    <oxd-thead>
      <oxd-tr>
        <oxd-th v-if="selectable" class="oxd-padding-cell oxd-table-th">
          <input
            v-model="selectedAll"
            type="checkbox"
            @change="onChangeSelectAll"
          />
        </oxd-th>
        <oxd-th
          v-for="header in headers"
          :key="JSON.stringify(header)"
          class="oxd-padding-cell oxd-table-th"
        >
          {{ header.title }}
        </oxd-th>
      </oxd-tr>
    </oxd-thead>

    <oxd-tbody :with-strip="withStrip">
      <oxd-tr
        v-for="(item, index) in items"
        :key="JSON.stringify(item)"
        :clickable="clickable"
        @click="onClick(item)($event)"
      >
        <oxd-td v-if="selectable" class="oxd-padding-cell">
          <input
            v-model="checkedItems"
            type="checkbox"
            :value="index"
            @click="onClickCheckbox(item, $event)"
          />
        </oxd-td>
        <oxd-td
          v-for="header in headers"
          :key="JSON.stringify(header)"
          class="oxd-padding-cell"
        >
          {{ item[header.name] }}
        </oxd-td>
      </oxd-tr>
    </oxd-tbody>

    <oxd-tfoot> </oxd-tfoot>
  </oxd-table>
</template>

<script lang="ts">
import type {PropType} from 'vue';
import {defineComponent} from 'vue';
import type {Header, Selector, Item} from './types';
import Table from '@/components/Table/Table.vue';
import TableRow from '@/components/Table/TableRow.vue';
import TableBody from '@/components/Table/TableBody.vue';
import TableHeader from '@/components/Table/TableHeader.vue';
import TableFooter from '@/components/Table/TableFooter.vue';
import TableDataCell from '@/components/Table/TableDataCell.vue';
import TableHeaderCell from '@/components/Table/TableHeaderCell.vue';

export default defineComponent({
  name: 'OxdClasicTable',

  components: {
    'oxd-table': Table,
    'oxd-tr': TableRow,
    'oxd-tbody': TableBody,
    'oxd-td': TableDataCell,
    'oxd-tfoot': TableFooter,
    'oxd-thead': TableHeader,
    'oxd-th': TableHeaderCell,
  },

  props: {
    selector: {
      type: Object as PropType<Selector>,
      required: false,
      default: () => ({width: '30px'}),
    },
    headers: {
      type: Array as PropType<Header[]>,
      required: false,
      default: () => [],
    },
    items: {
      type: Array as PropType<Item[]>,
      required: false,
      default: () => [],
    },
    withStrip: {
      type: Boolean,
      required: false,
      default: false,
    },
    clickable: {
      type: Boolean,
      required: false,
      default: true,
    },
    selectable: {
      type: Boolean,
      required: false,
      default: false,
    },
    selected: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  emits: ['click', 'clickCheckbox', 'update:selected', 'update:selectAll'],

  data() {
    return {
      checkedItems: this.selected as number[],
      selectedAll: (this.selected.length === this.items.length) as boolean,
    };
  },

  watch: {
    checkedItems(state) {
      this.selectedAll = state.length === this.items.length;
      this.$emit('update:selected', state);
    },
  },

  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick(item: any) {
      return (e: Event) => {
        this.$emit('click', {item, native: e});
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickCheckbox(item: any, e: Event) {
      e.stopPropagation();
      this.$emit('clickCheckbox', {item, native: e});
    },
    onChangeSelectAll() {
      this.checkedItems = this.selectedAll
        ? [...Array(this.items.length).keys()]
        : [];
      this.$emit('update:selectAll', this.selectedAll);
    },
  },
});
</script>

<style src="./classic-table.scss" lang="scss" scoped></style>
