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

import Icon from '@ohrm/oxd/core/components/Icon/Icon';
import * as SVGs from '@ohrm/oxd/core/components/Icon/map';

export default {
  title: 'Example/Icon (svg)',
  component: Icon,
  argTypes: {
    name: {
      control: {type: 'select', options: Object.keys(SVGs)},
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-icon': Icon},
  template: '<oxd-icon v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  type: 'svg',
  name: 'admin',
};

export const CustomStyles = Template.bind({});
CustomStyles.args = {
  name: 'pim',
  type: 'svg',
  style: {
    color: 'red',
  },
  height: 50,
  width: 50,
};
