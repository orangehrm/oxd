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
        :style="{width: header.width}"
        :key="header"
      />
    </colgroup>
    <oxd-thead>
      <oxd-tr>
        <oxd-th v-if="selectable" class="oxd-padding-cell oxd-table-th">
          <input
            type="checkbox"
            v-model="selectedAll"
            @change="onChangeSelectAll"
          />
        </oxd-th>
        <oxd-th
          class="oxd-padding-cell oxd-table-th"
          v-for="header in headers"
          :key="header"
        >
          {{ header.title }}
        </oxd-th>
      </oxd-tr>
    </oxd-thead>

    <oxd-tbody :with-strip="withStrip">
      <oxd-tr
        v-for="(item, index) in items"
        :key="item"
        :clickable="clickable"
        @click="onClick(item)($event)"
      >
        <oxd-td v-if="selectable" class="oxd-padding-cell">
          <input
            type="checkbox"
            :value="index"
            v-model="checkedItems"
            @click="onClickCheckbox(item, $event)"
          />
        </oxd-td>
        <oxd-td
          class="oxd-padding-cell"
          v-for="header in headers"
          :key="header"
        >
          {{ item[header.name] }}
        </oxd-td>
      </oxd-tr>
    </oxd-tbody>

    <oxd-tfoot> </oxd-tfoot>
  </oxd-table>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Table from '@orangehrm/oxd/core/components/Table/Table.vue';
import TableHeader from '@orangehrm/oxd/core/components/Table/TableHeader.vue';
import TableBody from '@orangehrm/oxd/core/components/Table/TableBody.vue';
import TableFooter from '@orangehrm/oxd/core/components/Table/TableFooter.vue';
import TableRow from '@orangehrm/oxd/core/components/Table/TableRow.vue';
import TableHeaderCell from '@orangehrm/oxd/core/components/Table/TableHeaderCell.vue';
import TableDataCell from '@orangehrm/oxd/core/components/Table/TableDataCell.vue';

export default defineComponent({
  name: 'oxd-clasic-table',

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

  props: {
    selector: {
      type: Object,
      default() {
        return {width: '30px'};
      },
    },
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    withStrip: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  emits: ['click', 'clickCheckbox', 'update:selected', 'update:selectAll'],

  components: {
    'oxd-table': Table,
    'oxd-thead': TableHeader,
    'oxd-tbody': TableBody,
    'oxd-tfoot': TableFooter,
    'oxd-tr': TableRow,
    'oxd-th': TableHeaderCell,
    'oxd-td': TableDataCell,
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
