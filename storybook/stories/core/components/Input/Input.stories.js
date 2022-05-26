import Input from '@orangehrm/oxd/core/components/Input/Input';

export default {
  title: 'Inputs/Text',
  component: Input,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-input': Input},
  template: '<oxd-input v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  value: 'Input',
};

export const Colored = Template.bind({});
Colored.args = {
  value: 'Input',
  style: {backgroundColor: 'aliceblue'},
};

export const Error = Template.bind({});
Error.args = {
  value: 'Input',
  hasError: true,
};
