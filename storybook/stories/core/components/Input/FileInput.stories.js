import FileInput from '@orangehrm/oxd/core/components/Input/FileInput';

export default {
  title: 'Example/FileInput',
  component: FileInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {'oxd-file-input': FileInput},
  template: '<oxd-file-input v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {};

export const Colored = Template.bind({});
Colored.args = {
  style: {backgroundColor: 'aliceblue'},
};

export const Error = Template.bind({});
Error.args = {
  hasError: true,
};

export const Labled = Template.bind({});
Labled.args = {
  buttonLabel: 'Browse',
};
