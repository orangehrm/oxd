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
      <template v-slot:pagination>
        <oxd-pagination :length="3" :max="10" />
      </template>
    </oxd-report-table>
  </div>
</template>

<script>
import ReportTable from '@orangehrm/oxd/core/components/ReportTable/ReportTable';
import Pagination from '@orangehrm/oxd/core/components/Pagination/Pagination';

export default {
  data() {
    return {
      height: 500,
      isLoading: false,
      headers: [
        {
          name: 'Leave Type',
          prop: 'type',
          size: 150,
          pin: 'colPinStart',
        },
        {
          name: 'Balance In Days',
          children: [
            {
              name: 'Leave Entitlement (Days)',
              prop: 'entitlement',
              size: 200,
              cellProperties: () => {
                return {
                  class: {
                    'col-alt': true,
                  },
                };
              },
            },
            {
              name: 'Leave Pending Approval (Days)',
              prop: 'pending',
              size: 200,
            },
            {
              name: 'Leave Scheduled (Days)',
              prop: 'scheduled',
              size: 200,
            },
            {
              name: 'Leave Taken (Days)',
              prop: 'taken',
              size: 200,
            },
            {
              name: 'Leave Balance (Days)',
              prop: 'balance',
              size: 200,
              cellProperties: () => {
                return {
                  class: {
                    'col-alt': true,
                  },
                };
              },
            },
          ],
        },
      ],
      items: [],
    };
  },

  components: {
    'oxd-report-table': ReportTable,
    'oxd-pagination': Pagination,
  },

  beforeMount() {
    const types = [
      'AUS - Annual',
      'AUS - Casual',
      'AUS - Maternity',
      'LKA - Annual',
      'LKA - Casual',
      'LKA - Maternity',
    ];
    this.items = new Array(50).fill('').map((_, index) => {
      const rand = Math.random();
      return {
        type: types[Math.floor(rand * types.length)],
        entitlement: parseFloat(rand * 100).toFixed(2),
        pending: '0.00',
        scheduled: '2.00',
        taken: '0.00',
        balance: parseFloat(rand * 100 - 2).toFixed(2),
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
