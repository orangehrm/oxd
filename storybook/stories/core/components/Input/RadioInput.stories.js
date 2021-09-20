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
 
import RadioInput from '@orangehrm/oxd/core/components/Input/RadioInput';
import {
  RIGHT,
  LABEL_POSITIONS,
} from '@orangehrm/oxd/core/components/Input/types';

export default {
  title: 'Example/RadioInput',
  component: RadioInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
    labelPosition: {
      control: {type: 'select', options: LABEL_POSITIONS},
      defaultValue: RIGHT,
    },
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-radio-input': RadioInput},
  template: '<oxd-radio-input v-bind="args" />',
});

const VmodelSample = () => ({
  data() {
    return {
      selected: '',
    };
  },
  components: {'oxd-radio-input': RadioInput},
  template: `<div>
    <oxd-radio-input v-model="selected" id="check1" value="orange" true-value="yes" false-value="no" optionLabel="Orange" />
    <br/>
    <span>{{selected}}</span>
  </div>`,
});

const VmodelMultiSample = () => ({
  data() {
    return {
      selected: 'apple',
    };
  },
  components: {'oxd-radio-input': RadioInput},
  template: `<div>
    <oxd-radio-input v-model="selected" id="check1" value="orange" optionLabel="Orange" />
    <br/>
    <oxd-radio-input v-model="selected" id="check2" value="mango" optionLabel="Mango" />
    <br/>
    <oxd-radio-input v-model="selected" id="check3" value="apple" optionLabel="Apple" />
    <br/>
    <span>{{selected}}</span>
  </div>`,
});

export const Default = Template.bind({});
Default.args = {
  optionLabel: 'Check this!',
};

export const Disabled = Template.bind({});
Disabled.args = {
  optionLabel: 'Cant check this!',
  disabled: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  optionLabel: 'Cant uncheck this!',
  checked: true,
  disabled: true,
};

export const Error = Template.bind({});
Error.args = {
  optionLabel: 'Error!',
  hasError: true,
};

export const VmodelSingle = VmodelSample.bind({});

export const VmodelMultiple = VmodelMultiSample.bind({});
