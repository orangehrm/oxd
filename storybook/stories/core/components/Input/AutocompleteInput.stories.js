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

import AutocompleteInput from '@ohrm/oxd/core/components/Input/Autocomplete/AutocompleteInput';
import {
  BOTTOM,
  DROPDOWN_POSITIONS,
} from '@ohrm/oxd/core/components/Input/types';
import {h, ref} from 'vue';
import AutocompleteCustom from './AutocompleteCustom.story.vue';

export default {
  title: 'Example/AutocompleteInput',
  component: AutocompleteInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
    dropdownPosition: {
      options: DROPDOWN_POSITIONS,
      defaultValue: BOTTOM,
    },
    createOptions: {
      control: {type: 'function'},
      defaultValue: () => [],
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
    label: 'Appraiser',
  },
];

const syncFunction = function (serachParam) {
  const filter = new RegExp(serachParam, 'i');
  return options.filter((item) => item.label.match(filter));
};

const asyncFunction = async function (serachParam) {
  const filter = new RegExp(serachParam, 'i');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(options.filter((item) => item.label.match(filter)));
    }, 2500);
  });
};

const callAPI = async function (serachParam) {
  return new Promise((resolve) => {
    if (serachParam.trim()) {
      fetch(`https://api.github.com/search/users?q=${serachParam}`)
        .then((response) => response.json())
        .then((json) => {
          const {items} = json;
          resolve(
            items.map((item) => {
              return {
                id: item.id,
                label: item.login,
              };
            }),
          );
        });
    } else {
      resolve([]);
    }
  });
};

const Template = (args) => ({
  setup() {
    const selected = ref();
    return {args, selected};
  },
  render() {
    return h(AutocompleteInput, {
      ...this.args,
      modelValue: this.selected,
      'onUpdate:modelValue': (value) => {
        this.selected = value;
      },
    });
  },
});

export const Default = Template.bind({});
Default.args = {};

export const Error = Template.bind({});
Error.args = {
  value: 'Input',
  hasError: true,
};

export const LoadSync = Template.bind({});
LoadSync.args = {
  createOptions: syncFunction,
};

export const LoadAsync = Template.bind({});
LoadAsync.args = {
  createOptions: asyncFunction,
};

export const LoadAPI = Template.bind({});
LoadAPI.args = {
  createOptions: callAPI,
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  createOptions: syncFunction,
  multiple: true,
};

export const CustomTemplate = () => AutocompleteCustom;
