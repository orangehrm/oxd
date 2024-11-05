import NumberInput from '@orangehrm/oxd/core/components/Input/NumberInput.vue';

export default {
  title: 'Inputs/NumberV2',
  component: NumberInput,
  argTypes: {
    propertyA: {
      options: ['Item One', 'Item Two', 'Item Three'],
      control: {type: 'select'}, // automatically inferred when 'options' is defined
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-number-input': NumberInput},
  template: '<oxd-number-input v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  type: 'Test',
};

export const SpecialScenario = Template.bind({});
SpecialScenario.args = {
  type: 'Special',
};
