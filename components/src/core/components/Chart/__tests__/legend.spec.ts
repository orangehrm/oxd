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

import {mount} from '@vue/test-utils';
import Legend from '@ohrm/oxd/core/components/Chart/Legend.vue';

describe('Chart > Legend.vue', () => {
  const dataset = [
    {value: 25, label: 'STEM', color: 'red'},
    {value: 50, label: 'Arts', color: 'green'},
    {value: 12.5, label: 'Law', color: 'blue'},
    {value: 12.5, label: 'Management', color: 'yellow'},
  ];

  it('should renders OXD chart legend', () => {
    const wrapper = mount(Legend, {
      props: {data: dataset},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have four key elements', () => {
    const wrapper = mount(Legend, {
      props: {data: dataset},
    });
    expect(wrapper.findAll('.oxd-chart-legend-key').length).toStrictEqual(4);
  });

  it('should emit index on click', async () => {
    const wrapper = mount(Legend, {
      props: {data: dataset},
    });
    await wrapper.findAll('.oxd-chart-legend-key + span')[3].trigger('click');
    expect(wrapper.emitted('click')).toContainEqual([3]);
  });
});
