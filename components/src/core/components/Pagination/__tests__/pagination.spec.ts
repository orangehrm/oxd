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
import Pagination from '@orangehrm/oxd/core/components/Pagination/Pagination.vue';

describe('Pagination.vue', () => {
  it('renders OXD Pagination', () => {
    const wrapper = mount(Pagination, {
      props: {length: 6},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Pagination with length < max', () => {
    const wrapper = mount(Pagination, {
      props: {length: 3, max: 5},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Pagination with length > max', () => {
    const wrapper = mount(Pagination, {
      props: {length: 21, max: 6},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Pagination with current', () => {
    const wrapper = mount(Pagination, {
      props: {length: 21, current: 21},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Pagination with |1|, 2, 3, 4, 5', () => {
    const wrapper = mount(Pagination, {
      props: {length: 21, current: 1, max: 5},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Pagination with 1, |2|, 3, 4, 5', () => {
    const wrapper = mount(Pagination, {
      props: {length: 21, current: 2, max: 5},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Pagination with 1, 2, |3|, 4, 5', () => {
    const wrapper = mount(Pagination, {
      props: {length: 21, current: 3, max: 5},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Pagination with 1, 2, 3, |4|, 5, 6', () => {
    const wrapper = mount(Pagination, {
      props: {length: 21, current: 4, max: 6},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Pagination with |17|, 18, 19, 20, 21', () => {
    const wrapper = mount(Pagination, {
      props: {length: 21, current: 17, max: 5},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Pagination with 17, |18|, 19, 20, 21', () => {
    const wrapper = mount(Pagination, {
      props: {length: 21, current: 18, max: 5},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Pagination with 17, 18, |19|, 20, 21', () => {
    const wrapper = mount(Pagination, {
      props: {length: 21, current: 19, max: 5},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Pagination with 17, 18, 19, |20|, 21', () => {
    const wrapper = mount(Pagination, {
      props: {length: 21, current: 20, max: 5},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Pagination with 17, 18, 19, 20, |21|', () => {
    const wrapper = mount(Pagination, {
      props: {length: 21, current: 21, max: 5},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
