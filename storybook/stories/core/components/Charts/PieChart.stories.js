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
import PieChartV2 from '@ohrm/oxd/core/components/Chart/PieChartV2';

export default {
  title: 'Example/PieChart',
  component: PieChart,
  argTypes: {
    backgroundColor: {control: 'color'},
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-pie-chart': PieChart},
  template: '<oxd-pie-chart v-bind="args" />',
});

export const ECharts = Template.bind({});
ECharts.args = {
  data: [
    {value: 1048, name: 'Engineering'},
    {value: 735, name: 'Marketing'},
    {value: 580, name: 'Human Resources'},
    {value: 484, name: 'Management'},
    {value: 300, name: 'Accounting'},
  ],
};

const Template2 = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-pie-chart2': PieChartV2},
  template: '<oxd-pie-chart2 v-bind="args" />',
});

export const ChartJs = Template2.bind({});
ChartJs.args = {
  data: [
    {value: 1048, name: 'Engineering'},
    {value: 735, name: 'Marketing'},
    {value: 580, name: 'Human Resources'},
    {value: 484, name: 'Management'},
    {value: 300, name: 'Accounting'},
  ],
};
