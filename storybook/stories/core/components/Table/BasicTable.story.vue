<template>
  <oxd-table>
    <colgroup>
      <col style="width:20%" />
      <col style="width:50%" />
    </colgroup>
    <oxd-thead>
      <oxd-tr>
        <oxd-th>Col 1</oxd-th>
        <oxd-th>Col 2</oxd-th>
      </oxd-tr>
    </oxd-thead>

    <oxd-tbody>
      <oxd-tr v-for="item in items" @click="onClick(item)($event)">
        <oxd-td>{{ item.col1 }}</oxd-td>
        <oxd-td>{{ item.col2 }}</oxd-td>
        <oxd-td>
          <button @click.stop="item.action">{{ item.col2 }}</button>
        </oxd-td>
      </oxd-tr>
    </oxd-tbody>

    <oxd-tfoot> </oxd-tfoot>
  </oxd-table>
</template>

<script>
import Table from '@orangehrm/oxd/core/components/Table/Table';
import TableHeader from '@orangehrm/oxd/core/components/Table/TableHeader';
import TableBody from '@orangehrm/oxd/core/components/Table/TableBody';
import TableFooter from '@orangehrm/oxd/core/components/Table/TableFooter';
import TableRow from '@orangehrm/oxd/core/components/Table/TableRow';
import TableHeaderCell from '@orangehrm/oxd/core/components/Table/TableHeaderCell';
import TableDataCell from '@orangehrm/oxd/core/components/Table/TableDataCell';

export default {
  data() {
    return {
      items: [
        {col1: 'Data 1', col2: 'Data 2'},
        {col1: 'Data 2', col2: 'Data 2'},
        {col1: 'Data 3', col2: 'Data 2'},
      ],
    };
  },

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
    onClick(item) {
      console.log(item);
      return e => {
        console.log(e);
      };
    },
    onBtnClick(e) {},
  },
};
</script>
