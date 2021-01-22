import Input from '@orangehrm/oxd/core/components/Input/Input';

export default {
  title: 'Example/Input',
  component: Input,
  argTypes: {
    style: {control: {type: 'object'}},
  },
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {'oxd-input': Input},
  template: '<oxd-input v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
  label: 'Input',
};

export const Colored = Template.bind({});
Colored.args = {
  label: 'Input',
  style: {backgroundColor: 'aliceblue'},
};
