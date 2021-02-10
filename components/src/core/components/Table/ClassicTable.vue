<template>
  <oxd-table>
    <colgroup>
      <col
        v-for="header in headers"
        :style="{width: header.width}"
        :key="header"
      />
    </colgroup>
    <oxd-thead>
      <oxd-tr>
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
        v-for="item in data"
        :key="item"
        :clickable="clickable"
        @click="onClick(item)($event)"
      >
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

<script>
import {defineComponent} from 'vue';
import Table from '@orangehrm/oxd/core/components/Table/Table';
import TableHeader from '@orangehrm/oxd/core/components/Table/TableHeader';
import TableBody from '@orangehrm/oxd/core/components/Table/TableBody';
import TableFooter from '@orangehrm/oxd/core/components/Table/TableFooter';
import TableRow from '@orangehrm/oxd/core/components/Table/TableRow';
import TableHeaderCell from '@orangehrm/oxd/core/components/Table/TableHeaderCell';
import TableDataCell from '@orangehrm/oxd/core/components/Table/TableDataCell';

export default defineComponent({
  name: 'oxd-clasic-table',

  props: {
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
    data: {
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
  },

  emits: ['click'],

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
      return e => {
        this.$emit('click', {item, native: e});
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.oxd-padding-cell {
  padding: 0.65rem;
}

.oxd-table-th {
  text-align: left;
}
</style>
