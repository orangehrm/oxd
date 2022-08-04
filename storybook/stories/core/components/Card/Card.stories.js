import Card from '@orangehrm/oxd/core/components/Card/Card';

export default {
  title: 'Layout/Card',
  component: Card,
  argTypes: {},
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-card': Card},
  template: '<oxd-card v-bind="args"></oxd-card>',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Card',
};
