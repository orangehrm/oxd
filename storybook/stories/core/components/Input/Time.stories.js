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
    const selected = ref('05:00');
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
