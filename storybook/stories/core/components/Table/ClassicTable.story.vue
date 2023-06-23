<template>
  <oxd-clasic-table
    :selector="selector"
    :headers="headers"
    :items="items"
    @click="onClick"
    selectable
    v-model:selected="checkedItems"
  />
</template>

<script>
import ClassicTable from '@orangehrm/oxd/core/components/Table/ClassicTable';

export default {
  data() {
    return {
      selector: {
        width: '3%',
      },
      headers: [
        {name: 'col1', title: 'Column 1', width: '17%'},
        {name: 'col2', title: 'Column 2', width: '20%', style: {border: 'solid 1px #D3D3D3', 'border-radius': '0.5rem', 'padding': '5px 10px', 'width': 'fit-content'}},
        {name: 'col3', title: 'Column 3', width: '60%', maxCharacterLength: 100, flow: 'bottom'},
      ],
      items: [
        {col1: 'Data 1', col2: 'Hello!!', col3: 'Data 1'},
        {col1: 'Data 2', col2: 'Hola!!', col3: 'Data 2'},
        {
          col1: 'Data 3',
          col2: 'Bonjour!!',
          col3:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
      checkedItems: [2, 0],
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
