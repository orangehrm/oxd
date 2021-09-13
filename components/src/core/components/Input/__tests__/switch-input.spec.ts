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
import SwitchInput from '@orangehrm/oxd/core/components/Input/SwitchInput.vue';

describe('SwitchInput.vue', () => {
  it('renders OXD Switch Input', () => {
    const value = 'Checkbox';
    const wrapper = mount(SwitchInput, {
      props: {label: value},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with error', () => {
    const value = 'Checkbox';
    const wrapper = mount(SwitchInput, {
      props: {label: value, hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit checked value on click', async () => {
    const wrapper = mount(SwitchInput, {
      props: {
        modelValue: false,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toContainEqual([true]);
  });

  it('should emit unchecked value on click', async () => {
    const wrapper = mount(SwitchInput, {
      props: {
        modelValue: true,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toContainEqual([false]);
  });

  it('should not emit any value if disabled', async () => {
    const wrapper = mount(SwitchInput, {
      props: {
        disabled: true,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
});
