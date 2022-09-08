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

import PieChart from '@ohrm/oxd/core/components/Chart/PieChart';
import {generateRandomColor} from '../../../../../components/src/utils/color';

export default {
  title: 'Example/Charts/Pie',
  component: PieChart,
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-pie-chart': PieChart},
  template: '<oxd-pie-chart v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  width: '400px',
  height: '400px',
  responsive: false,
  title: 'Pie Chart',
  data: [
    {value: 55, label: 'Apple', color: generateRandomColor()},
    {value: 99.99, label: 'Orange', color: generateRandomColor()},
    {value: 612, label: 'Grapes', color: generateRandomColor()},
    {value: 150, label: 'Pineapple', color: generateRandomColor()},
    {value: 300, label: 'Cherry', color: generateRandomColor()},
  ],
};

export const HideBorderWidth = Template.bind({});
HideBorderWidth.args = {
  width: '400px',
  height: '400px',
  responsive: false,
  title: 'Pie Chart',
  data: [
    {value: 0, label: 'Orange', color: generateRandomColor()},
    {value: 45, label: 'Apple', color: generateRandomColor()},
    {value: 0, label: 'Pineapple', color: generateRandomColor()},
  ],
};
