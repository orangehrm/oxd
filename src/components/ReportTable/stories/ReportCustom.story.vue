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
import CellAdapter from '@/components/ReportTable/CellAdapter';
import Pagination from '@/components/Pagination/Pagination.vue';
import ReportTable from '@/components/ReportTable/ReportTable.vue';
import MultilineCell from '@/components/ReportTable/Cell/MultilineCell.vue';

export default {
  components: {
    'oxd-pagination': Pagination,
    'oxd-report-table': ReportTable,
  },
  data() {
    return {
      height: 500,
      isLoading: false,
      headers: [
        {
          name: 'First Name',
          prop: 'employeeFirstname',
        },
        {
          name: 'Last Name',
          prop: 'employeeLastname',
          pin: 'colPinStart',
        },
        {
          name: 'Supervisor First Name',
          cellTemplate: CellAdapter(MultilineCell),
          prop: 'supervisorFirstName',
        },
        {
          name: 'Supervisor Last Name',
          cellTemplate: CellAdapter(MultilineCell),
          prop: 'supervisorLastName',
        },
        {
          name: 'Reporting Method',
          cellTemplate: CellAdapter(MultilineCell),
          prop: 'supReportingMethod',
        },
      ],
      items: [],
    };
  },

  beforeMount() {
    this.items = new Array(5).fill('').map(() => {
      const rand = new String(Math.random() * 100000).substring(0, 4);
      return {
        employeeId: rand,
        employeeFirstname: 'Tom',
        employeeLastname: 'Cruise ' + rand,
        supervisorFirstName: ['David', 'Mathew'],
        supervisorLastName: ['Hasselhoff', 'Hayden'],
        supReportingMethod: ['Direct', 'Direct'],
        _rows: 2,
      };
    });
  },
};
</script>

<style lang="scss" scoped>
.orangehrm-container {
  background-color: #f6f5fb;
  border-radius: unset;
}
</style>
