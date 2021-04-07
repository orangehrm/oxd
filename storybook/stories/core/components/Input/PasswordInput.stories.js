import PasswordInput from '@orangehrm/oxd/core/components/Input/PasswordInput';

export default {
  title: 'Example/PasswordInput',
  component: PasswordInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-password-input': PasswordInput},
  template: '<oxd-password-input v-bind="args" />',
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
