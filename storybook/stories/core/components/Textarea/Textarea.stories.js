import Textarea from '@orangehrm/oxd/core/components/Textarea/Textarea';

export default {
  title: 'Inputs/Textarea',
  component: Textarea,
  argTypes: {
    resize: {
      control: {type: 'select', options: ['vertical', 'horizontal', 'none']},
    },
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-textarea': Textarea},
  template: '<oxd-textarea v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  value: 'Textarea',
  style: {},
};

export const Colored = Template.bind({});
Colored.args = {
  value: 'Textarea',
  style: {backgroundColor: 'aliceblue'},
};

export const Error = Template.bind({});
Error.args = {
  value: 'Textarea',
  hasError: true,
};
