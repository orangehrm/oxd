import ProgressBar from '@orangehrm/oxd/core/components/ProgressBar/ProgressBar';

export default {
  title: 'Information/ProgressBar/Linear',
  component: ProgressBar,
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-progress-bar': ProgressBar},
  template: '<oxd-progress-bar v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Exporting Candidate List to CSV',
  show: true,
};
export const CustomValue = Template.bind({});
CustomValue.args = {
  title: 'Exporting Candidate List to CSV',
  show: true,
  progressValue: 90,
};