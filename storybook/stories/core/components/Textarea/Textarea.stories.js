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

import Textarea from '@ohrm/oxd/core/components/Textarea/Textarea';

export default {
  title: 'Example/Textarea',
  component: Textarea,
  argTypes: {
    resize: {
      control: {type: 'select', options: ['vertical', 'horizontal', 'none']},
    },
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-textarea': Textarea},
  template: '<oxd-textarea v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  value: 'Textarea',
  style: {},
};

export const Colored = Template.bind({});
Colored.args = {
  value: 'Textarea',
  style: {backgroundColor: 'aliceblue'},
};

export const Error = Template.bind({});
Error.args = {
  value: 'Textarea',
  hasError: true,
};
