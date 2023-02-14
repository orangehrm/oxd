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
      <col style="width: 20%" />
      <col style="width: 50%" />
    </colgroup>
    <oxd-thead>
      <oxd-tr>
        <oxd-th>Col 1</oxd-th>
        <oxd-th>Col 2</oxd-th>
      </oxd-tr>
    </oxd-thead>

    <oxd-tbody>
      <oxd-tr v-for="item in items" :key="item" @click="onClick(item)($event)">
        <oxd-td>{{ item.col1 }}</oxd-td>
        <oxd-td>{{ item.col2 }}</oxd-td>
        <oxd-td>
          <oxd-icon-button name="trash" @click.stop="onBtnClick" />
        </oxd-td>
      </oxd-tr>
    </oxd-tbody>

    <oxd-tfoot> </oxd-tfoot>
  </oxd-table>
</template>

<script>
import Table from '@/components/Table/Table.vue';
import IconButton from '@/components/Button/Icon.vue';
import TableRow from '@/components/Table/TableRow.vue';
import TableBody from '@/components/Table/TableBody.vue';
import TableFooter from '@/components/Table/TableFooter.vue';
import TableHeader from '@/components/Table/TableHeader.vue';
import TableDataCell from '@/components/Table/TableDataCell.vue';
import TableHeaderCell from '@/components/Table/TableHeaderCell.vue';

export default {
  components: {
    'oxd-table': Table,
    'oxd-thead': TableHeader,
    'oxd-tbody': TableBody,
    'oxd-tfoot': TableFooter,
    'oxd-tr': TableRow,
    'oxd-th': TableHeaderCell,
    'oxd-td': TableDataCell,
    'oxd-icon-button': IconButton,
  },
  data() {
    return {
      items: [
        {col1: 'Data 1', col2: 'Data 2'},
        {col1: 'Data 2', col2: 'Data 2'},
        {col1: 'Data 3', col2: 'Data 2'},
      ],
    };
  },

  methods: {
    onClick(item) {
      console.log(item);
      return (e) => {
        console.log(e);
      };
    },
    onBtnClick() {
      // do nothing
    },
  },
};
</script>
