<template>
  <oxd-clasic-table :headers="headers" :data="items" @click="onClick" />
</template>

<script>
import ClassicTable from '@orangehrm/oxd/core/components/Table/ClassicTable';

export default {
  data() {
    return {
      headers: [
        {name: 'col1', title: 'Column 1', width: '30%'},
        {name: 'col2', title: 'Column 2', width: '40%'},
      ],
      items: [
        {col1: 'Data 1', col2: 'Data 2'},
        {col1: 'Data 2', col2: 'Data 2'},
        {col1: 'Data 3', col2: 'Data 2'},
      ],
    };
  },

  components: {
    'oxd-clasic-table': ClassicTable,
  },

  methods: {
    onClick(e) {
      console.log(e);
    },
  },
};
</script>
