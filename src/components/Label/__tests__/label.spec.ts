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
import {describe, expect, it} from 'vitest';
import Label from '@/components/Label/Label.vue';

describe('Label.vue', () => {
  it('renders OXD Label', () => {
    const wrapper = mount(Label, {
      props: {label: 'Label'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Label with custom color', () => {
    const wrapper = mount(Label, {
      props: {label: 'Label', style: {color: 'red'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
