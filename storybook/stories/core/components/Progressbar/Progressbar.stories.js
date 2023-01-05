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

import Progressbar from '@ohrm/oxd/core/components/Progressbar/Progressbar.vue';
import {TYPES} from '@ohrm/oxd/core/components/Progressbar/types';

export default {
  title: 'Example/Progressbar',
  component: Progressbar,
  argTypes: {
    type: {
      control: {type: 'select', options: TYPES},
    },
    progress: {
      control: {type: 'range', min: 0, max: 100, step: 1},
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-progressbar': Progressbar},
  template: '<oxd-progressbar v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  type: 'default',
  progress: 15,
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  showLabel: false,
  type: 'secondary',
  progress: 85,
};

export const WithStripes = Template.bind({});
WithStripes.args = {
  stripe: true,
  showLabel: false,
  type: 'main',
  progress: 10.22,
};

export const WithAnimation = Template.bind({});
WithAnimation.args = {
  stripe: true,
  animation: true,
  showLabel: false,
  type: 'warn',
  progress: 25.22222,
};
