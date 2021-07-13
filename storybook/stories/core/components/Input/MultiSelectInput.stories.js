import MultiSelectInput from '@orangehrm/oxd/core/components/Input/MultiSelect/MultiSelectInput';
import {
  BOTTOM,
  DROPDOWN_POSITIONS,
} from '@orangehrm/oxd/core/components/Input/types';
import {h, ref} from 'vue';

export default {
  title: 'Example/MultiSelectInput',
  component: MultiSelectInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
    dropdownPosition: {
      options: DROPDOWN_POSITIONS,
      defaultValue: BOTTOM,
    },
    options: {
      control: {type: 'array'},
      defaultValue: [],
    },
  },
};

const options = [
  {
    id: 1,
    label: 'HR Admin',
  },
  {
    id: 2,
    label: 'ESS User',
  },
  {
    id: 3,
    label: 'Supervisor',
  },
  {
    id: 4,
    label: 'Manager',
  },
  {
    id: 5,
    label: 'Employee',
  },
  {
    id: 6,
    label: 'Assistant Manager',
  },
  {
    id: 7,
    label: 'Director',
  },
  {
    id: 8,
    label: 'Officer',
  },
  {
    id: 9,
    label: 'Appraiser',
  },
  {
    id: 10,
    label: 'Senior Executive',
  },
];

const Template = args => ({
  setup() {
    const selected = ref([]);
    return {args, selected};
  },
  render() {
    return h(MultiSelectInput, {
      ...this.args,
      modelValue: this.selected,
      'onUpdate:modelValue': value => {
        this.selected = value;
      },
    });
  },
});

export const Default = Template.bind({});
Default.args = {
  options: options,
};

export const Error = Template.bind({});
Error.args = {
  hasError: true,
};

export const DefaultDisabled = Template.bind({});
DefaultDisabled.args = {
  options: options,
  disabled: true,
};
