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
import CardTable from '@orangehrm/oxd/core/components/CardTable/CardTable';

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
          cellConfig: {
            accept: {
              onClick(item, e) {
                console.log(item);
                console.log(e);
              },
              component: 'oxd-button',
              props: {
                label: 'Approve',
                displayType: 'label',
                size: 'medium',
              },
            },
            reject: {
              onClick(item, e) {
                console.log(item);
                console.log(e);
              },
              component: 'oxd-button',
              props: {
                label: 'Reject',
                displayType: 'label-danger',
                size: 'medium',
              },
            },
            more: {
              onClick(item, e) {
                console.log(item);
                console.log(e.context);
              },
              component: 'oxd-table-dropdown',
              props: {
                options: [
                  {label: 'Add Comment', context: 'add_comment'},
                  {label: 'View Leave Details', context: 'leave_details'},
                  {label: 'View PIM Info', context: 'pim_details'},
                  {label: 'Cancel Leave', context: 'cancel_leave'},
                ],
              },
            },
          },
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
        },
        {
          date: '2021-06-20 to 2021-06-21',
          employee: 'Kevin Randall Micheal',
          leaveType: 'Casual Leave',
          leaveBalance: '5.00',
          days: '1.00',
          status: 'Scheduled (1.00)',
          comment: 'Sick',
        },
        {
          date: '2021-07-05 to 2021-07-06',
          employee: 'Ridiculously Longnamefortestingpurposes',
          leaveType: '(US) Annual Leave',
          leaveBalance: '8.00',
          days: '2.00',
          status: 'Pending Approval (2.0)',
          comment:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy ',
        },
      ],
      checkedItems: [],
    };
  },

  components: {
    'oxd-card-table': CardTable,
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
