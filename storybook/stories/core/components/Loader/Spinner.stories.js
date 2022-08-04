import Spinner from '@orangehrm/oxd/core/components/Loader/Spinner';

export default {
  title: 'Information/Loader/Spinner',
  component: Spinner,
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-loading-spinner': Spinner},
  template: '<oxd-loading-spinner v-bind="args" />',
});

export const Default = Template.bind({});

export const WithoutContainer = Template.bind({});
WithoutContainer.args = {
  withContainer: false,
};
