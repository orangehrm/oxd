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
import PageItem from '@/components/Pagination/PageItem.vue';

describe('PageItem.vue', () => {
  it('renders OXD PageItem', () => {
    const wrapper = mount(PageItem, {
      props: {page: 1},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD PageItem previous', () => {
    const wrapper = mount(PageItem, {
      props: {previous: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD PageItem next', () => {
    const wrapper = mount(PageItem, {
      props: {next: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD PageItem selected', () => {
    const wrapper = mount(PageItem, {
      props: {page: 2, selected: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
