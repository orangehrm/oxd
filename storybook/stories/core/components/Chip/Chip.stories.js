import Chip from "@orangehrm/oxd/core/components/Chip/Chip";

export default {
  title: "Example/Chip",
  component: Chip,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { "oxd-chip": Chip },
  template: '<oxd-chip v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
  transparent: false,
  label: "Chip",
};

