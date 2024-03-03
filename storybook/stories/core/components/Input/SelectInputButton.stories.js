import SelectInputButton from '@orangehrm/oxd/core/components/Input/Select/SelectInputButton';
import {
  BOTTOM,
  DROPDOWN_POSITIONS,
} from '@orangehrm/oxd/core/components/Input/types';
import {h, ref} from 'vue';

export default {
  title: 'Inputs/SelectInputButton',
  component: SelectInputButton,
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
    button: {control: {type: 'object'}},
    dropdownTriggerIconStyles: {
      control: {type: 'object'},
      table: {
        type: {
          summary:
            'This is to define the custom styles for drop down trigger button icon',
        },
      },
    },
    dropdownTriggerButtonBackgroundColor: {
      control: {type: 'text'},
      table: {
        type: {
          summary:
            'This is to define the custom color for drop down trigger button background. Color should be given as a hexadecimal value. eg:"#f1f1f1"',
        },
      },
    },
  },
};

const options = [
  {
    id: -1,
    label: 'All Vacancies',
  },
  {
    id: 1,
    label: 'Account Rec/Pay Clerk Vacancy',
  },
  {
    id: 2,
    label: 'Assistant to the Associate Dean Vacancy',
  },
  {
    id: 3,
    label: 'Assistant to the Vice Charncellor Vacancy',
  },
  {
    id: 4,
    label: 'Associate Author Vacancy',
  },
  {
    id: 5,
    label: 'Audit Clerk',
  },
  {
    id: 6,
    label: 'Benefits Specialist Vacancy',
  },
  {
    id: 7,
    label: 'Clerk-Typist Vacancy',
  },
  {
    id: 8,
    label: 'Conference Assistant Vacancy',
  },
  {
    id: 9,
    label: 'Fee Control Clerk Vacancy',
  },
  {
    id: 10,
    label: 'Loan Clerk Vacancy',
  },
];

const buttonObject = {
  label: 'All Vacancies',
  labelMini: null,
  iconName: 'eye',
  iconSize: 'small',
  iconStyle: 'height: 20px; display: flex; align-items: center; color: #68a61d',
  iconImageSrc: null,
  size: 'long',
  displayType: 'label',
  doubleLineLabel: true,
  showLabel: true,
  labelMini: 'Vacancy',
  style: {
    'background-color': '#ebfcd6',
    'justify-content': 'space-between',
  },
};

const Template = (args) => ({
  setup() {
    const selected = ref(null);
    return {args, selected};
  },
  render() {
    return h(SelectInputButton, {
      ...this.args,
      modelValue: this.selected,
      'onUpdate:modelValue': (value) => {
        if (value.id > -1) {
          this.selected = value;
        } else {
          this.selected = null;
        }
      },
    });
  },
});

export const Default = Template.bind({});
Default.args = {
  options: options,
  button: buttonObject,
  moreIconName: 'oxd-info',
  doubleLineLabel: true,
  additionalIconName: 'oxd-best-match',
};

export const Error = Template.bind({});
Error.args = {
  hasError: true,
  moreIconName: 'oxd-info',
  doubleLineLabel: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: options,
  disabled: true,
  moreIconName: 'oxd-info',
  doubleLineLabel: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
  options: options,
  readonly: true,
  moreIconName: 'oxd-info',
  doubleLineLabel: true,
};

export const LongLabels = Template.bind({});
LongLabels.args = {
  options: [
    {id: 1, label: 'This is a very long label for testing the dropdown field'},
    {
      id: 2,
      label:
        'aaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbbbbbbbb cccccccccccccccccccccc ddddddddddddddddddddddddddddd eeeeeeeeeeeeeeeeeeeee fffffffffffffffff gggggggggggggggggggggggggg hhhhhhhhhhhhhhh iiiiiiiiiiiiiiiiiiiiii jjjjjjjjjjjjjjjjjjjjjj aaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbbbbbbbb cccccccccccccccccccccc ddddddddddddddddddddddddddddd eeeeeeeeeeeeeeeeeeeee fffffffffffffffff gggggggggggggggggggggggggg hhhhhhhhhhhhhhh iiiiiiiiiiiiiiiiiiiiii jjjjjjjjjjjjjjjjjjjjjj',
    },
    {id: 3, label: 'normal length label'},
    {id: 4, label: null},
    {id: 5, label: 'ඔක්තෝබර්'},
  ],
  moreIconName: 'oxd-info',
  doubleLineLabel: true,
};

export const CustomDropdownTriggerStyles = Template.bind({});
CustomDropdownTriggerStyles.args = {
  options: options,
  button: buttonObject,
  moreIconName: 'oxd-info',
  doubleLineLabel: true,
  dropdownTriggerIconStyles: {color: '#ff0000'},
  dropdownTriggerButtonBackgroundColor: '#ff0000',
};

export const WithAdditionalIcon = Template.bind({});
WithAdditionalIcon.args = {
  options: options,
  button: buttonObject,
  additionalIconName: 'oxd-best-match',
  doubleLineLabel: true,
};

export const CustomDropdownOpenCloseIcons = Template.bind({});
CustomDropdownOpenCloseIcons.args = {
  options: options,
  button: buttonObject,
  dropdownTriggerOpenIcon: 'oxd-arrow-right',
  dropdownTriggerCloseIcon: 'oxd-arrow-left',
};
