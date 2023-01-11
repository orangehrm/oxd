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
-->

<template>
  <div class="orangehrm-container">
    <oxd-card-table
      :selector="selector"
      :headers="headers"
      :items="items"
      :selectable="true"
      :clickable="false"
      v-model:selected="checkedItems"
      rowDecorator="oxd-table-decorator-card"
    />
  </div>
</template>

<script>
import CardTable from '@/components/CardTable/CardTable.vue';

export default {
  data() {
    return {
      headers: [
        {name: 'date', title: 'Date', style: {flex: 1}},
        {name: 'employee', title: 'Employee Name', style: {flex: 1}},
        {name: 'leaveType', title: 'Leave Type', style: {flex: 1}},
        {name: 'leaveBalance', title: 'Leave Balance (Days)', style: {flex: 1}},
        {name: 'days', title: 'Number of Days', style: {flex: 1}},
        {name: 'status', title: 'Status', style: {flex: 1}},
        {name: 'comment', title: 'Comments', style: {flex: '5%'}},
        {
          name: 'action',
          slot: 'footer',
          title: 'Actions',
          style: {flex: '20%'},
          cellType: 'oxd-table-cell-actions',
          cellRenderer: this.cellRenderer,
        },
      ],
      items: [
        {
          date: '2021-08-01 to 2021-08-07',
          employee: 'Joss Wheadon',
          leaveType: 'Annual Leave',
          leaveBalance: '8.00',
          days: '7.00',
          status: 'Pending Approval (7.0)',
          comment: 'Family vacation leaves',
          allowedActions: {APPROVE: true, CANCEL: true, REJECT: true},
        },
        {
          date: '2021-06-20 to 2021-06-21',
          employee: 'Kevin Randall Micheal',
          leaveType: 'Casual Leave',
          leaveBalance: '5.00',
          days: '1.00',
          status: 'Scheduled (1.00)',
          comment: 'Sick',
          allowedActions: {APPROVE: false, CANCEL: true, REJECT: false},
        },
        {
          date: '2021-07-05 to 2021-07-06',
          employee: 'Ridiculously Longnamefortestingpurposes',
          leaveType: '(US) Annual Leave',
          leaveBalance: '8.00',
          days: '2.00',
          status: 'Taken (2.0)',
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy ',
          allowedActions: {REJECT: true},
        },
      ],
      checkedItems: [],
    };
  },

  components: {
    'oxd-card-table': CardTable,
  },

  methods: {
    cellRenderer(index, item, header, row) {
      const accept = {
        component: 'oxd-button',
        props: {
          label: 'Approve',
          displayType: 'label',
          size: 'medium',
        },
      };
      const reject = {
        component: 'oxd-button',
        props: {
          label: 'Reject',
          displayType: 'label-danger',
          size: 'medium',
        },
      };
      const more = {
        component: 'oxd-table-dropdown',
        props: {
          options: [
            {label: 'Add Comment', context: 'add_comment'},
            {label: 'View Leave Details', context: 'leave_details'},
            {label: 'View PIM Info', context: 'pim_details'},
          ],
          style: {'margin-left': 'auto'},
        },
      };
      if (row.allowedActions.CANCEL) {
        more.props.options.push({
          label: 'Cancel Leave',
          context: 'cancel_leave',
        });
      }
      return {
        props: {
          header: {
            cellConfig: {
              ...(row.allowedActions.APPROVE && {accept}),
              ...(row.allowedActions.REJECT && {reject}),
              more,
            },
          },
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.orangehrm-container {
  background-color: #f6f5fb;
  border-radius: 1.2rem;
  padding: 0.5rem;
}
::v-deep(.card-footer-slot) {
  .oxd-table-cell-actions {
    justify-content: flex-end;
  }
}
</style>
