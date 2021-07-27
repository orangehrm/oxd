import {h, ref} from 'vue';
import TimeInput from '@orangehrm/oxd/core/components/Input/Time/TimeInput';

export default {
  title: 'Example/TimeInput',
  component: TimeInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = args => ({
  setup() {
    const selected = ref('05:00 AM');
    return {args, selected};
  },
  render() {
    return h('div', {}, [
      h(TimeInput, {
        ...this.args,
        modelValue: this.selected,
        'onUpdate:modelValue': value => {
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

export const Error = Template.bind({});
Error.args = {
  optionLabel: 'Error!',
  hasError: true,
};

export const CustomStep = Template.bind({});
CustomStep.args = {
  step: 10,
};
