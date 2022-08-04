import CellActions from '@orangehrm/oxd/core/components/CardTable/Cell/Actions';

export default {
  title: 'Data Tables/CardTable/Cell',
  argTypes: {onClick: {action: 'clicked'}},
};

const Template = args => ({
  setup() {
    return {args};
  },
  provide: {tableProps: {}},
  components: {'oxd-table-cell-actions': CellActions},
  template: '<oxd-table-cell-actions v-bind="args" />',
});

export const Actions = Template.bind({});
Actions.args = {
  rowItem: {id: 1, col1: 'Test'},
  item: {
    delete: {
      component: 'oxd-icon-button',
      props: {
        name: 'trash',
      },
      onClick(item) {
        console.log(item);
      },
    },
    edit: {
      props: {
        name: 'pencil-fill',
      },
    },
  },
};
