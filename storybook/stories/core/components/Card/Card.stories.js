import Card from '@orangehrm/oxd/core/components/Card/Card';

export default {
  title: 'Example/Card',
  component: Card,
  argTypes: {
    style: {control: {type: 'object'}},
  },
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {'oxd-card': Card},
  template: '<oxd-card v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Card',
};
