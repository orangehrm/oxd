import Divider from '@orangehrm/oxd/core/components/Divider/Divider';

export default {
  title: 'Example/Divider',
  component: Divider,
  argTypes: {
    style: {control: {type: 'object'}},
  },
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {'oxd-divider': Divider},
  template: '<oxd-divider v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {};

export const Colored = Template.bind({});
Colored.args = {
  style: {borderColor: 'red'},
};
