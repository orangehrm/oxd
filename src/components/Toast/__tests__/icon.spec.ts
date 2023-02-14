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
import ToastIcon from '@/components/Toast/Icon.vue';

describe('Toast > Icon.vue', () => {
  it('should renders OXD ToastIcon', () => {
    const wrapper = mount(ToastIcon, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastIcon success', () => {
    const wrapper = mount(ToastIcon, {
      props: {type: 'success'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastIcon warn', () => {
    const wrapper = mount(ToastIcon, {
      props: {type: 'warn'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastIcon error', () => {
    const wrapper = mount(ToastIcon, {
      props: {type: 'error'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastIcon info', () => {
    const wrapper = mount(ToastIcon, {
      props: {type: 'info'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
