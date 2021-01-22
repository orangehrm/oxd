import Label from "@orangehrm/oxd/core/components/Label/Label";

export default {
  title: "Example/Label",
  component: Label,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { "oxd-label": Label },
  template: '<oxd-label v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};

export const Colored = Template.bind({});
Colored.args = {
  label: "Label",
  style: { color: "red" },
};
