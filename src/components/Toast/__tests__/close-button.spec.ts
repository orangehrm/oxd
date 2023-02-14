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
import Toast from '@/components/Toast/CloseButton.vue';

describe('Toast > CloseButton.vue', () => {
  it('should renders OXD ToastCloseButton', () => {
    const wrapper = mount(Toast, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastCloseButton success', () => {
    const wrapper = mount(Toast, {
      props: {type: 'success'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastCloseButton warn', () => {
    const wrapper = mount(Toast, {
      props: {type: 'warn'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastCloseButton error', () => {
    const wrapper = mount(Toast, {
      props: {type: 'error'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastCloseButton info', () => {
    const wrapper = mount(Toast, {
      props: {type: 'info'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
