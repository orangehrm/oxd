import SchemaForm from '@orangehrm/oxd/core/components/SchemaForm/SchemaForm';

export default {
  title: 'Example/SchemaForm',
  component: SchemaForm,
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-schema-form': SchemaForm},
  template: `<oxd-schema-form v-bind="args"></oxd-schema-form>`,
});

export const Default = Template.bind({});
Default.args = {
  schema: {
    layout: [
      {
        type: 'grid',
        props: {
          cols: 2,
        },
        children: [
          {
            slot: 'default',
            fields: [
              {
                name: 'firstName',
                label: 'First Name',
                type: 'input',
                asterisk: true,
                validation: [],
              },
            ],
          },
        ],
      },
    ],
  },
};
