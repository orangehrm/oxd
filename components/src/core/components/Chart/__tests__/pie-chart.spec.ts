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

import {shallowMount} from '@vue/test-utils';
import PieChart from '@ohrm/oxd/core/components/Chart/PieChart.vue';

jest.mock('chart.js');

describe('Chart > PieChart.vue', () => {
  it('should renders OXD piec chart', () => {
    const wrapper = shallowMount(PieChart, {
      props: {
        data: [
          {value: 25, label: 'STEM', color: 'red'},
          {value: 50, label: 'Arts', color: 'green'},
          {value: 12.5, label: 'Law', color: 'blue'},
          {value: 12.5, label: 'Management', color: 'yellow'},
        ],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
