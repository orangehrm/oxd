import Input from "@orangehrm/oxd/core/components/Input/Input.vue";

export default {
  title: "Example/Input",
  component: Input,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { "oxd-input": Input },
  template: '<oxd-input v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
  label: "Input",
};

