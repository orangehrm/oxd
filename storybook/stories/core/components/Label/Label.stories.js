import Label from '@orangehrm/oxd/core/components/Label/Label';

export default {
  title: 'Information/Label',
  component: Label,
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-label': Label},
  template: '<oxd-label v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
};

export const Colored = Template.bind({});
Colored.args = {
  label: 'Label',
  style: {color: 'red'},
};
