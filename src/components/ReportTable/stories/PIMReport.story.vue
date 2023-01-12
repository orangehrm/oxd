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
  <div class="orangehrm-container">
    <oxd-report-table
      :loading="isLoading"
      :height="height"
      :headers="headers"
      :items="items"
    >
      <template #pagination>
        <oxd-pagination :length="3" :max="10" />
      </template>
    </oxd-report-table>
  </div>
</template>

<script>
import {headers, data} from './mockdata';
import CellAdapter from '@/components/ReportTable/CellAdapter';
import Pagination from '@/components/Pagination/Pagination.vue';
import ReportTable from '@/components/ReportTable/ReportTable.vue';
import MultilineCell from '@/components/ReportTable/Cell/MultilineCell.vue';

export default {
  components: {
    'oxd-report-table': ReportTable,
    'oxd-pagination': Pagination,
  },
  data() {
    return {
      height: 500,
      isLoading: false,
      headers: [],
      items: [],
    };
  },

  beforeMount() {
    const setupColumn = (column) => {
      delete column['size'];
      const {type} = column.cellProperties ?? {};
      return {
        ...column,
        cellProperties: undefined,
        cellTemplate: type === 'list' ? CellAdapter(MultilineCell) : undefined,
      };
    };
    this.headers = headers.map((header) => {
      if (header?.children && Array.isArray(header.children)) {
        header.children = header.children.map((child) => setupColumn(child));
        return header;
      } else {
        return setupColumn(header);
      }
    });
    this.items = data.map((item) => {
      let _rows = 0;
      for (const key in item) {
        const value = item[key];
        if (Array.isArray(value) && value.length > _rows) _rows = value.length;
      }
      return {...item, _rows};
    });
  },
};
</script>

<style lang="scss" scoped>
.orangehrm-container {
  background-color: #f6f5fb;
  border-radius: unset;
}
::v-deep(revogr-data .rgCell) {
  &:empty:before {
    content: '--';
  }
}
</style>
