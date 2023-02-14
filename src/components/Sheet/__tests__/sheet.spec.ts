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
import Sheet from '@/components/Sheet/Sheet.vue';

describe('Sheet.vue', () => {
  it('should renders OXD Sheet', () => {
    const wrapper = mount(Sheet, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, not rounded', () => {
    const wrapper = mount(Sheet, {
      props: {rounded: false},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, without gutters', () => {
    const wrapper = mount(Sheet, {
      props: {gutters: false},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type white', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'white'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type white-shadow', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'white-shadow'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type pastel-white', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'pastel-white'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type light-gray', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'light-gray'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type gray-lighten-2', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'gray-lighten-2'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type gray-lighten-1', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'gray-lighten-1'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type gray', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'gray'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type gray-darken-1', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'gray-darken-1'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type gray-darken-2', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'gray-darken-2'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
