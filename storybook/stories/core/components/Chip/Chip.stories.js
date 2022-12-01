import Chip from '@orangehrm/oxd/core/components/Chip/Chip';

export default {
  title: 'Information/Chip',
  component: Chip,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-chip': Chip},
  template: '<oxd-chip v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  transparent: false,
  label: 'Chip',
};
