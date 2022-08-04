<template>
  <div class="orangehrm-container">
    <oxd-card-table
      :headers="headers"
      :items="items"
      :highlight-rows="highlightRows"
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
        {name: 'col1', title: 'Column 1', sortable: true, style: {flex: 1}},
        {name: 'col2', title: 'Column 2', style: {flex: 5}},
      ],
      items: [],
    };
  },

  props: {
    highlightRows: {
      type: Object
    }
  },

  components: {
    'oxd-card-table': CardTable,
  },

  methods: {
    onClick(e) {
      console.log(e);
    },
  },

  created() {
    this.items = [
      {col1: 'Data 1', col2: 'Data 2'},
      {col1: 'Data 2', col2: 'Data 2'},
      {
        col1: 'Data 3',
        col2:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ];
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
