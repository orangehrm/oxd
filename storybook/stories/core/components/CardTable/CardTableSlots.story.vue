<template>
  <div class="orangehrm-container">
    <oxd-card-table
      :selector="selector"
      :headers="headers"
      :items="items"
      @click="onClick"
      :selectable="selectable"
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

  props: {
    selectable: {
      type: Boolean,
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

  created() {
    // simulate async data fetch
    // setTimeout(() => {
    //   this.items = [
    //     {col1: 'Data 1', col2: 'Data 2'},
    //     {col1: 'Data 2', col2: 'Data 2'},
    //     {
    //       col1: 'Data 3',
    //       col2:
    //         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //     },
    //   ];
    // }, 1000);
    // setInterval(() => {
    //   this.items.push({col1: 'Data 1', col2: 'Data 4'});
    // }, 5000);
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
