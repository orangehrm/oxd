import {h, ref} from 'vue';
import TimeInput from '@orangehrm/oxd/core/components/Input/Time/TimeInput';

export default {
  title: 'Inputs/TimeInput',
  component: TimeInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
    allowedEmpty: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary:
            'Set boolean value to allow empty values. The default value is false',
        },
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    const selected = ref('05:00');
    return {args, selected};
  },
  render() {
    return h('div', {}, [
      h(TimeInput, {
        ...this.args,
        modelValue: this.selected,
        'onUpdate:modelValue': (value) => {
          this.selected = value;
        },
      }),
      h('p', {}, `v-model : ${this.selected}`),
    ]);
  },
});

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const AllowedEmpty = Template.bind({});
AllowedEmpty.args = {
  allowedEmpty: true,
};

export const Error = Template.bind({});
Error.args = {
  optionLabel: 'Error!',
  hasError: true,
};

export const CustomStep = Template.bind({});
CustomStep.args = {
  step: 10,
};
