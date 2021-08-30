import IconButton from '@orangehrm/oxd/core/components/Button/Icon';

export default {
  title: 'Example/Button/IconButton',
  component: IconButton,
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-icon-button': IconButton},
  template: '<oxd-icon-button v-bind="args" />',
});

export const Icon = Template.bind({});
Icon.args = {
  name: 'oxd_buzz_likes',
  withContainer: false,
};
Icon.argTypes = {};

export const ListIcon = Template.bind({});
ListIcon.args = {
  name: 'oxd_buzz_likes',
  withContainer: true,
};
