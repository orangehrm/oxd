import IconButton from '@orangehrm/oxd/core/components/Button/Icon';

export default {
  title: 'Example/Button/IconButton',
  component: IconButton,
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {'oxd-icon-button': IconButton},
  template: '<oxd-icon-button v-bind="$props" />',
});

export const Icon = Template.bind({});
Icon.args = {
  name: 'trash',
};
Icon.argTypes = {};

export const ListIcon = Template.bind({});
ListIcon.args = {
  name: 'trash',
  withContainer: true,
};
