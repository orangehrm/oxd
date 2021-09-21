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
import PasswordInput from '@orangehrm/oxd/core/components/Input/PasswordInput.vue';

describe('PasswordInput.vue', () => {
  it('renders OXD Input', () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with custom color', () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value, style: {backgroundColor: 'aliceblue'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with error', () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value, hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
