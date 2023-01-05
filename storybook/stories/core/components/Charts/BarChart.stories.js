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

import BarChart from '@ohrm/oxd/core/components/Chart/BarChart';
import {generateRandomColor} from '../../../../../components/src/utils/color';

export default {
  title: 'Example/Charts/Bar',
  component: BarChart,
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-bar-chart': BarChart},
  template: '<oxd-bar-chart v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  width: '400px',
  height: '400px',
  responsive: false,
  title: 'Bar Chart',
  data: [
    {value: 55, label: 'Cheese', color: generateRandomColor()},
    {value: 20, label: 'Ham', color: generateRandomColor()},
    {value: 80, label: 'Bacon', color: generateRandomColor()},
    {value: 10, label: 'Taco', color: generateRandomColor()},
    {value: 300, label: 'Butter', color: generateRandomColor()},
  ],
};
