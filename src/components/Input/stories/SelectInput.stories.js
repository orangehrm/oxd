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

import {h, ref} from 'vue';
import SelectInput from '@/components/Input/Select/SelectInput.vue';
import {BOTTOM, DROPDOWN_POSITIONS} from '@/components/Input/types';

export default {
  title: 'Example/SelectInput',
  component: SelectInput,
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

const Template = (args) => ({
  setup() {
    const selected = ref(args.value ?? null);
    return {args, selected};
  },
  render() {
    return h(SelectInput, {
      ...this.args,
      modelValue: this.selected,
      'onUpdate:modelValue': (value) => {
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
  options: [],
  hasError: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: options,
  disabled: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
  options: options,
  readonly: true,
};

export const LongLabels = Template.bind({});
LongLabels.args = {
  options: [
    {id: 1, label: 'This is a very long label for testing the dropdown field'},
    {
      id: 2,
      label:
        'aaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbbbbbbbb cccccccccccccccccccccc ddddddddddddddddddddddddddddd',
    },
    {id: 3, label: 'normal length label'},
    {id: 4, label: null},
    {id: 5, label: 'ඔක්තෝබර්'},
  ],
};

export const PreSelected = Template.bind({});
PreSelected.args = {
  options: options,
  value: {
    id: 4,
    label: 'Manager',
  },
  showEmptySelector: false,
};

export const CustomEmptyText = Template.bind({});
CustomEmptyText.args = {
  options: [],
  emptyText: 'No Leave Types Available',
};
