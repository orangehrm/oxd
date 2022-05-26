import Divider from '@orangehrm/oxd/core/components/Divider/Divider';

export default {
  title: 'Layout/Divider',
  component: Divider,
  argTypes: {
    style: {control: {type: 'object'}},
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-divider': Divider},
  template: '<oxd-divider v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};

export const Colored = Template.bind({});
Colored.args = {
  style: {borderColor: 'red'},
};
