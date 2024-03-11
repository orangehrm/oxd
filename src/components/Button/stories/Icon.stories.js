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

import {ICON_TYPES} from '@/components/Button/types';
import IconButton from '@/components/Button/Icon.vue';

export default {
  title: 'Example/Button/IconButton',
  component: IconButton,
  argTypes: {
    displayType: {
      options: ICON_TYPES,
      control: {type: 'select'},
    },
    disabled: {control: {type: 'boolean'}},
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-icon-button': IconButton},
  template: '<oxd-icon-button v-bind="args" />',
});

export const Icon = Template.bind({});
Icon.args = {
  name: 'trash',
  withContainer: false,
};
Icon.argTypes = {};

export const ListIcon = Template.bind({});
ListIcon.args = {
  name: 'trash',
  withContainer: true,
};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  name: 'chat-left-dots',
  disabled: false,
  displayType: 'secondary',
};

export const SVGIcon = Template.bind({});
SVGIcon.args = {
  name: 'pim',
  iconType: 'svg',
  displayType: 'main',
};
