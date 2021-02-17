import Spinner from '@orangehrm/oxd/core/components/Loader/Spinner';

export default {
  title: 'Example/Loader/Spinner',
  component: Spinner,
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {'oxd-loading-spinner': Spinner},
  template: '<oxd-loading-spinner v-bind="$props" />',
});

export const Default = Template.bind({});

export const WithoutContainer = Template.bind({});
WithoutContainer.args = {
  withContainer: false,
};
