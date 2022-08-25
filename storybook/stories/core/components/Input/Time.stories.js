import {h, ref} from 'vue';
import TimeInput from '@orangehrm/oxd/core/components/Input/Time/TimeInput';

export default {
  title: 'Inputs/TimeInput',
  component: TimeInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
    allowEmpty: {
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
    const initialValue = args.initialValue ?? '05:00';
    const selected = ref(initialValue);
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
Default.args = {
  initialValue: '05:00',
};

export const InitialValuePM = Template.bind({});
InitialValuePM.args = {
  initialValue: '17:00',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const EmptyInitialValue = Template.bind({});
EmptyInitialValue.args = {
  initialValue: '',
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
