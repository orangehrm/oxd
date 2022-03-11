import SchemaForm from '@orangehrm/oxd/core/components/SchemaForm/SchemaForm';

export default {
  title: 'Example/SchemaForm',
  component: SchemaForm,
};

const Template = (args) => ({
  setup() {
    const onSubmit = (...args) => {
      console.log(args);
    };
    return {args, onSubmit};
  },
  components: {'oxd-schema-form': SchemaForm},
  template: `<oxd-schema-form v-bind="args" v-on:submitValid="onSubmit" ></oxd-schema-form>`,
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
        children: {
          default: [
            {
              name: 'firstName',
              label: 'First Name',
              type: 'input',
              required: true,
              validators: [(v) => (!!v && v.trim() !== '') || 'Required'],
            },
          ],
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'action',
        children: {
          default: [
            {
              name: 'submit',
              label: 'Submit',
              type: 'button',
              props: {
                type: 'submit',
                displayType: 'secondary',
              },
            },
          ],
        },
      },
    ],
  },
};
