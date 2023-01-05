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
import RadioInput from '@ohrm/oxd/core/components/Input/RadioInput.vue';

describe('RadioInput.vue', () => {
  it('renders OXD Radio Input', () => {
    const value = 'Radio';
    const wrapper = mount(RadioInput, {
      props: {label: value},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Radio input with error', () => {
    const value = 'Radio';
    const wrapper = mount(RadioInput, {
      props: {label: value, hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit checked value on click', async () => {
    const wrapper = mount(RadioInput, {
      props: {
        modelValue: '',
        value: 'test',
      },
    });
    await wrapper.find("input[type='radio']").trigger('click');
    await wrapper.find("input[type='radio']").trigger('change');
    expect(wrapper.emitted('update:modelValue')).toContainEqual(['test']);
  });

  it('should not emit any value if disabled', async () => {
    const wrapper = mount(RadioInput, {
      props: {
        disabled: true,
      },
    });
    await wrapper.find("input[type='radio']").trigger('click');
    await wrapper.find("input[type='radio']").trigger('change');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
});
