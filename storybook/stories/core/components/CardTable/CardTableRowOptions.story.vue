<template>
  <div class="orangehrm-container">
    <oxd-card-table
      :headers="headers"
      :items="items"
      @click="onClick"
      :selectable="selectable"
      :disabled="disabled"
      :clickable="clickable"
      :loading="loading"
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
        {name: 'col1', title: 'Column 1', style: {flex: 1}},
        {name: 'col2', title: 'Column 2', style: {flex: 1}},
        {
          name: 'col3',
          title: 'Column 3',
          style: {flex: 1},
          cellType: 'oxd-table-cell-actions',
          cellConfig: {
            edit: {
              onClick(item, e) {
                console.log(item);
                console.log(e);
              },
              props: {
                name: 'pencil-fill',
              },
            },
          },
        },
      ],
      checkedItems: [],
    };
  },

  props: {
    selectable: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
    clickable: {
      type: Boolean,
    },
    items: {
      type: Array,
    },
  },

  components: {
    'oxd-card-table': CardTable,
  },

  methods: {
    onClick(e) {
      console.log(e);
    },
  },
};
</script>

<style>
.orangehrm-container {
  background-color: #f6f5fb;
  border-radius: 1.2rem;
  padding: 0.5rem;
}
</style>
