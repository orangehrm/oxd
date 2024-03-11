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

import PasswordInput from '@/components/Input/PasswordInput.vue';
import {ref, h} from 'vue';

export default {
  title: 'Example/PasswordInput',
  component: PasswordInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = (args) => ({
  setup() {
    const input = ref('Input');
    return {args, input};
  },
  render() {
    return h(PasswordInput, {
      ...this.args,
      modelValue: this.input,
      'onUpdate:modelValue': (value) => {
        this.input = value;
      },
    });
  },
});

export const Default = Template.bind({});
Default.args = {};

export const Colored = Template.bind({});
Colored.args = {
  style: {backgroundColor: 'aliceblue'},
};

export const Error = Template.bind({});
Error.args = {
  hasError: true,
};
