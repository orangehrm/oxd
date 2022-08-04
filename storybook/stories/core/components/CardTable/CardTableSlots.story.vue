<template>
  <div class="orangehrm-container">
    <oxd-card-table
      :selector="selector"
      :headers="headers"
      :items="items"
      @click="onClick"
      :selectable="true"
      :clickable="false"
      v-model:selected="checkedItems"
      rowDecorator="oxd-table-decorator-card"
    />
  </div>
  <br />
  <div>{{ checkedItems }}</div>
</template>

<script>
import CardTable from '@orangehrm/oxd/core/components/CardTable/CardTable';

export default {
  data() {
    return {
      selector: {
        style: {flex: 1},
      },
      headers: [
        {name: 'col1', title: 'Default', style: {flex: 1}},
        {name: 'col2', slot: 'title', title: 'Title', style: {flex: 1}},
        {name: 'col3', slot: 'action', title: 'Action', style: {flex: 1}},
        {name: 'col4', slot: 'footer', title: 'Footer', style: {flex: 1}},
        {name: 'col5', slot: 'left', title: 'Left', style: {flex: 1}},
        {name: 'col6', slot: 'right', title: 'Right', style: {flex: 1}},
      ],
      items: [
        {
          col1: 'Default data content',
          col2: 'Title Content',
          col3: 'Action Content',
          col4: 'Footer Content',
          col5: 'Left Content',
          col6: 'Right Content',
        },
        {
          col1: 'Default data content',
          col2: 'Title Content',
          col3: 'Action Content',
          col4: 'Footer Content',
          col5: 'Left Content',
          col6: 'Right Content',
        },
        {
          col1: 'Default data content',
          col2: 'Title Content',
          col3: 'Action Content',
          col4: 'Footer Content',
          col5: 'Left Content',
          col6: 'Right Content',
        },
      ],
      checkedItems: [2, 0],
    };
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

<style lang="scss" scoped>
.orangehrm-container {
  background-color: #f6f5fb;
  border-radius: 1.2rem;
  padding: 0.5rem;
}
::v-deep(.card-item) {
  padding: 0.5rem 0.75rem;
  border: 1px dotted red;
}
</style>
