<template>
  <oxd-list-table
    :flashing="true"
    :selectable="true"
    :headers="headers"
    :loading="isLoading"
    :items="sortedItems"
    v-model:order="order"
    v-model:selected="checkedItems"
  ></oxd-list-table>
  <br />
  <oxd-button label="Add Item" @click="onClickAdd" />
</template>

<script>
import Button from '@orangehrm/oxd/core/components/Button/Button';
import ListTable from '@orangehrm/oxd/core/components/ListTable/ListTable';
import TableSelectInput from '@orangehrm/oxd/core/components/CardTable/Cell/TableSelectInput';

export default {
  components: {
    'oxd-button': Button,
    'oxd-list-table': ListTable,
  },

  data() {
    return {
      selector: {
        style: {flex: 1},
      },
      headers: [
        {
          name: 'col1',
          sortField: 'col1.name',
          title: 'Column 1',
          style: {flex: 1},
        },
        {
          name: 'col2',
          title: 'Column 2',
          style: {flex: 1},
        },
        {
          name: 'action',
          title: 'Action',
          style: {flex: 1},
          cellRenderer: this.actionsRenderer,
        },
      ],
      items: [],
      checkedItems: [],
      isLoading: false,
      order: {
        'col1.name': {
          order: 'ASC',
          iconAsc: '',
          iconDesc: '',
        },
      },
    };
  },

  methods: {
    onClickAdd() {
      const length = this.items.length + 1;
      this.items.push({
        col1: `Data ${length}`,
        col2: `Data ${length}`,
        type: null,
      });
    },
    actionsRenderer(index, data, header, row) {
      return {
        component: TableSelectInput,
        props: {
          options: [
            {
              id: 1,
              label: 'HR Admin',
            },
            {
              id: 2,
              label: 'ESS User',
            },
          ],
          modelValue: row.type,
          'onUpdate:modelValue': ($event) => {
            this.items[index].type = $event;
          },
        },
      };
    },
  },

  computed: {
    sortedItems() {
      const sort = this.order['col1.name'];
      return this.items.sort(function (a, b) {
        if (sort === 'DESC') [b, a] = [a, b];
        if (parseInt(a.col1.split(' ')[1]) < parseInt(b.col1.split(' ')[1]))
          return -1;
        return 0;
      });
    },
  },

  beforeMount() {
    this.isLoading = true;
    // simulate async data fetch
    setTimeout(() => {
      this.items = [
        {col1: 'Data 1', col2: 'Data 1', type: null},
        {col1: 'Data 2', col2: 'Data 2', type: null},
        {col1: 'Data 3', col2: 'Data 3', type: null},
      ];
      this.isLoading = false;
    }, 2000);
  },
};
</script>
