import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput';

export default {
  title: 'Example/CheckboxInput',
  component: CheckboxInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-checkbox-input': CheckboxInput},
  template: '<oxd-checkbox-input v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  optionLabel: 'Check this!',
};

export const Disabled = Template.bind({});
Disabled.args = {
  optionLabel: 'Cant check this!',
  disabled: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  optionLabel: 'Cant uncheck this!',
  disabled: true,
  checked: true,
};

export const Error = Template.bind({});
Error.args = {
  optionLabel: 'Error!',
  hasError: true,
};
