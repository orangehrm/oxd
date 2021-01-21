import Label from "@orangehrm/oxd/core/components/Label/Label.vue";

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
