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
import DateInput from '@/components/Input/DateInput.vue';
import Input from '@/components/Input/Input.vue';
import {formatDate, freshDate} from '@/utils/date';

describe('DateInput.vue', () => {
  it('renders OXD Date Input', () => {
    const wrapper = mount(DateInput, {});
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should open datepicker on click', async () => {
    const wrapper = mount(DateInput, {});
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.open).toBeTruthy();
    expect(wrapper.emitted('dateselect:opened')).toBeTruthy();
    expect(wrapper.find('.oxd-calendar-wrapper').exists()).toBeTruthy();
  });
  it('should not open datepicker on click, if disabled', async () => {
    const wrapper = mount(DateInput, {
      props: {disabled: true},
    });
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.open).toBeFalsy();
    expect(wrapper.emitted('dateselect:opened')).toBeFalsy();
    expect(wrapper.find('.oxd-calendar-wrapper').exists()).toBeFalsy();
  });
  it('should accept valid input', async () => {
    const wrapper = mount(DateInput, {});
    const input = wrapper.findComponent(Input);
    (input.element as HTMLInputElement).value = '2021-07-30';
    await input.trigger('input');
    await input.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toEqual([['2021-07-30']]);
  });
  it('should return today date onclick today', async () => {
    const wrapper = mount(DateInput, {});
    await wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    await wrapper.find('.oxd-date-input-link.--today').trigger('click');
    const dateExpected = formatDate(freshDate(), 'yyyy-MM-dd');
    expect(wrapper.emitted('update:modelValue')).toEqual([[dateExpected]]);
  });
  it('should clear date onclick clear', async () => {
    const wrapper = mount(DateInput, {});
    await wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    await wrapper.find('.oxd-date-input-link.--clear').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[null]]);
  });
  it('should close datepicker onclick close', async () => {
    const wrapper = mount(DateInput, {});
    await wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    await wrapper.find('.oxd-date-input-link.--close').trigger('click');
    expect(wrapper.emitted('dateselect:closed')).toBeTruthy();
  });
  it('should display selected date', async () => {
    const wrapper = mount(DateInput, {
      props: {modelValue: '2021-12-30'},
    });
    await wrapper.vm.$nextTick();
    const input = wrapper.findComponent(Input);
    expect((input.element as HTMLInputElement).value).toEqual('2021-12-30');
  });
  it('should display value passed as prop over selected date', async () => {
    const wrapper = mount(DateInput, {
      props: {modelValue: '2021-12-30', value: '2021-12-01 - 2021-12-31'},
    });
    await wrapper.vm.$nextTick();
    const input = wrapper.findComponent(Input);
    expect((input.element as HTMLInputElement).value).toEqual(
      '2021-12-01 - 2021-12-31',
    );
  });
});
