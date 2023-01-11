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
import {describe, expect, it, vi} from 'vitest';
import Input from '@/components/Input/Input.vue';
import ColorInput from '@/components/Input/Color/ColorInput.vue';
import ColorPicker from '@/components/Input/Color/ColorPicker.vue';

describe('ColorInput.vue', () => {
  // Mock canvas method
  HTMLCanvasElement.prototype.getContext = () => null;
  HTMLCanvasElement.prototype.getBoundingClientRect = () => ({
    bottom: 0,
    height: 228,
    left: 0,
    right: 0,
    top: 0,
    width: 228,
    x: 0,
    y: 0,
    toJSON: () => vi.fn(),
  });
  it('renders OXD Color Input', () => {
    const wrapper = mount(ColorInput, {});
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('renders OXD Color Input with color', () => {
    const wrapper = mount(ColorInput, {
      props: {modelValue: '#ff0000'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should open colorpicker on click', async () => {
    const wrapper = mount(ColorInput, {});
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.open).toBeTruthy();
    expect(wrapper.find('.oxd-color-picker').exists()).toBeTruthy();
  });
  it('should focus/blur colorpicker', async () => {
    const wrapper = mount(ColorInput, {});
    wrapper.trigger('focus');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.focused).toBeTruthy();
    wrapper.trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.focused).toBeFalsy();
  });
  it('should close colorpicker on click outside', async () => {
    const wrapper = mount(ColorInput, {});
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    await document.body.dispatchEvent(new Event('click'));
    expect(wrapper.vm.open).toBeFalsy();
    expect(wrapper.find('.oxd-color-picker').exists()).toBeFalsy();
  });
  it('should not open timepicker on click, if disabled', async () => {
    const wrapper = mount(ColorInput, {
      props: {disabled: true},
    });
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.open).toBeFalsy();
    expect(wrapper.find('.oxd-color-picker').exists()).toBeFalsy();
  });
  it('should not focus colorpicker, if disabled', async () => {
    const wrapper = mount(ColorInput, {
      props: {disabled: true},
    });
    wrapper.trigger('focus');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.focused).toBeFalsy();
  });
  it('should accept 6 digit hex input', async () => {
    const wrapper = mount(ColorInput, {});
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(ColorPicker);
    const pickerInput = picker.findComponent(Input);
    (pickerInput.element as HTMLInputElement).value = '#ff0000';
    await pickerInput.trigger('input');
    expect(wrapper.emitted('update:modelValue')).toEqual([['#ff0000']]);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should not accept 3 digit hex input', async () => {
    const wrapper = mount(ColorInput, {});
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(ColorPicker);
    const pickerInput = picker.findComponent(Input);
    (pickerInput.element as HTMLInputElement).value = '#ff0';
    await pickerInput.trigger('input');
    expect(wrapper.emitted('update:modelValue')).toEqual([['#ff0']]);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should change hue on hue slider is changed', async () => {
    const wrapper = mount(ColorInput, {
      props: {modelValue: '#ff0000'},
    });
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(ColorPicker);
    const hueSlider = picker.find('.oxd-color-picker-range');
    (hueSlider.element as HTMLInputElement).value = '300';
    await hueSlider.trigger('change');
    expect(wrapper.emitted('update:modelValue')).toEqual([['#ff00ff']]);
  });
  it('should show color indicator in correction position', async () => {
    const wrapper = mount(ColorInput, {});
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(ColorPicker);
    const pickerInput = picker.findComponent(Input);
    expect(wrapper.find('.oxd-color-picker-indicator').attributes().style).toBe(
      'top: 228px; left: 0px;',
    );
    (pickerInput.element as HTMLInputElement).value = '#2e40dd';
    await pickerInput.trigger('input');
    expect(wrapper.find('.oxd-color-picker-indicator').attributes().style).toBe(
      'top: 30px; left: 181px;',
    );
  });
});
