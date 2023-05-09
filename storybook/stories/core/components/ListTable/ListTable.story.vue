<template>
  <oxd-list-table
    :items="items"
    :selectable="true"
    :headers="headers"
    :disabled="disabled"
    :loading="isLoading"
    v-model:selected="checkedItems"
  ></oxd-list-table>
  <br />
  <oxd-button label="Add Item" @click="onClickAdd" />
</template>

<script>
import Button from '@orangehrm/oxd/core/components/Button/Button';
import ListTable from '@orangehrm/oxd/core/components/CardTable/ListTable';

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
        {name: 'col1', title: 'Column 1', style: {flex: 1}},
        {name: 'col2', title: 'Column 2', style: {flex: 1}},
        {name: 'col3', title: 'Action', style: {flex: 1}},
      ],
      items: [],
      checkedItems: [],
      isLoading: false,
    };
  },

  methods: {
    onClickAdd() {
      this.items.push({col1: 'Data 3', col2: 'Data 3'});
    },
  },

  beforeMount() {
    this.isLoading = true;
    // simulate async data fetch
    setTimeout(() => {
      this.items = [
        {col1: 'Data 1', col2: 'Data 2'},
        {col1: 'Data 2', col2: 'Data 2'},
        {col1: 'Data 3', col2: 'Data 3'},
      ];
      this.isLoading = false;
    }, 2000);
  },
};
</script>
