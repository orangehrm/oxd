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
import TimeInput from '@orangehrm/oxd/core/components/Input/Time/TimeInput.vue';
import TimePicker from '@orangehrm/oxd/core/components/Input/Time/TimePicker.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';

describe('TimeInput.vue', () => {
  it('renders OXD Time Input', () => {
    const wrapper = mount(TimeInput, {});
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should open timepicker on click', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.open).toBeTruthy();
    expect(wrapper.emitted('timeselect:opened')).toBeTruthy();
    expect(wrapper.find('.oxd-time-picker').exists()).toBeTruthy();
  });
  it('should not open timepicker on click, if disabled', async () => {
    const wrapper = mount(TimeInput, {
      props: {disabled: true},
    });
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.open).toBeFalsy();
    expect(wrapper.emitted('timeselect:opened')).toBeFalsy();
    expect(wrapper.find('.oxd-time-picker').exists()).toBeFalsy();
  });
  it('should accept valid input', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const pickerInputs = picker.findAllComponents(Input);
    (pickerInputs[0].element as HTMLInputElement).value = '05';
    await pickerInputs[0].trigger('change');
    (pickerInputs[1].element as HTMLInputElement).value = '10';
    await pickerInputs[1].trigger('change');
    expect(wrapper.vm.timeInput).toEqual('05:10');
  });
  it('should not accept invalid input', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const pickerInput = picker.findComponent(Input);
    (pickerInput.element as HTMLInputElement).value = '23';
    await pickerInput.trigger('change');
    expect(wrapper.vm.timeInput).toEqual('01:00');
  });
  it('should increment/decrement hour', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const incrementBtn = picker.find('.oxd-time-hour-input-up');
    const decrementBtn = picker.find('.oxd-time-hour-input-down');
    expect(wrapper.vm.timeInput).toEqual('01:00');
    await incrementBtn.trigger('click');
    expect(wrapper.vm.timeInput).toEqual('02:00');
    await decrementBtn.trigger('click');
    expect(wrapper.vm.timeInput).toEqual('01:00');
  });
  it('should increment/decrement minute', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(TimePicker);
    const incrementBtn = picker.find('.oxd-time-minute-input-up');
    const decrementBtn = picker.find('.oxd-time-minute-input-down');
    expect(wrapper.vm.timeInput).toEqual('01:00');
    await incrementBtn.trigger('click');
    expect(wrapper.vm.timeInput).toEqual('01:01');
    await decrementBtn.trigger('click');
    expect(wrapper.vm.timeInput).toEqual('01:00');
  });
  it('should toggle AM/PM', async () => {
    const wrapper = mount(TimeInput, {});
    wrapper.findComponent(Input).trigger('click');
    await wrapper.vm.$nextTick();
    const period = wrapper.findAll('input[type="radio"]');
    expect(wrapper.vm.timeInput).toEqual('01:00');
    await period[1].setValue(true);
    expect(wrapper.vm.timeInput).toEqual('13:00');
    await period[0].setValue(true);
    expect(wrapper.vm.timeInput).toEqual('01:00');
  });
});
