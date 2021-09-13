/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */
 
import InputField from '@orangehrm/oxd/core/components/InputField/InputField';
import {TYPES} from '@orangehrm/oxd/core/components/InputField/types';
import InputFieldValidation from './InputFieldValidation.story.vue';
import Form from '@orangehrm/oxd/core/components/Form/Form';
import {h, ref} from 'vue';

export default {
  title: 'Example/InputField',
  component: InputField,
};

const argTypes = {
  type: {
    control: {type: 'select', options: TYPES},
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-input-field': InputField, 'oxd-form': Form},
  template: '<oxd-form><oxd-input-field v-bind="args" /></oxd-form>',
});

const DropdownTemplate = args => ({
  setup() {
    const selected = ref([]);
    return {args, selected};
  },
  render() {
    return h(
      Form,
      {},
      {
        default: () => {
          return h(InputField, {
            ...this.args,
            modelValue: this.selected,
            'onUpdate:modelValue': value => {
              this.selected = [...value];
            },
          });
        },
      },
    );
  },
});

export const Default = Template.bind({});
Default.argTypes = argTypes;
Default.args = {
  label: 'Input Field',
  type: 'input',
};

export const File = Template.bind({});
File.argTypes = argTypes;
File.args = {
  label: 'File Input Field',
  type: 'file',
  buttonLabel: 'Browse',
};

export const Textarea = Template.bind({});
Textarea.argTypes = argTypes;
Textarea.args = {
  label: 'Textarea Input Field',
  type: 'textarea',
};

export const Dropdown = DropdownTemplate.bind({});
Dropdown.argTypes = argTypes;
Dropdown.args = {
  label: 'Dropdown Input Field',
  type: 'dropdown',
  createOptions: async function() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            label: 'All',
          },
          {
            id: 2,
            label: 'HR Admin',
          },
          {
            id: 3,
            label: 'ESS',
          },
        ]);
      }, 5000);
    });
  },
};

export const PasswordInput = Template.bind({});
PasswordInput.argTypes = argTypes;
PasswordInput.args = {
  label: 'Password Input Field',
  type: 'password',
};

export const CheckboxInput = Template.bind({});
CheckboxInput.argTypes = argTypes;
CheckboxInput.args = {
  label: 'Checkbox Input Field',
  optionLabel: 'check this!',
  type: 'checkbox',
};

export const SwitchInput = Template.bind({});
SwitchInput.argTypes = argTypes;
SwitchInput.args = {
  label: 'Switch Input Field',
  optionLabel: 'switch this!',
  type: 'switch',
};

export const RadioInput = Template.bind({});
RadioInput.argTypes = argTypes;
RadioInput.args = {
  label: 'Radio Input Field',
  optionLabel: 'check this!',
  type: 'radio',
};

export const WithIcon = Template.bind({});
WithIcon.argTypes = argTypes;
WithIcon.args = {
  label: 'Textarea Input Field',
  labelIcon: 'card-text',
  type: 'textarea',
};

export const DateInput = Template.bind({});
DateInput.argTypes = argTypes;
DateInput.args = {
  label: 'Date Input Field',
  type: 'date',
};

export const AutocompleteInput = Template.bind({});
AutocompleteInput.argTypes = argTypes;
AutocompleteInput.args = {
  label: 'Autocomplete Input Field',
  type: 'autocomplete',
  modelValue: null,
  createOptions: async function() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            label: 'All',
          },
          {
            id: 2,
            label: 'HR Admin',
          },
          {
            id: 3,
            label: 'ESS',
          },
        ]);
      }, 1000);
    });
  },
};

export const SelectInput = Template.bind({});
SelectInput.argTypes = argTypes;
SelectInput.args = {
  label: 'Dropdown Input Field',
  type: 'select',
  modelValue: null,
  options: [
    {
      id: 1,
      label: 'All',
    },
    {
      id: 2,
      label: 'HR Admin',
    },
    {
      id: 3,
      label: 'ESS',
    },
  ],
};

export const MultiselectInput = Template.bind({});
MultiselectInput.argTypes = argTypes;
MultiselectInput.args = {
  label: 'Multiselect Input Field',
  type: 'multiselect',
  modelValue: [],
  options: [
    {
      id: 1,
      label: 'All',
    },
    {
      id: 2,
      label: 'HR Admin',
    },
    {
      id: 3,
      label: 'ESS',
    },
  ],
};

export const TimeInput = Template.bind({});
TimeInput.argTypes = argTypes;
TimeInput.args = {
  label: 'Time Input Field',
  type: 'time',
};

export const WithValidation = () => InputFieldValidation;
