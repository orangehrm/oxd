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
import {defineComponent} from 'vue';
import eventsMixin from '@orangehrm/oxd/core/components/Input/Select/events-mixin';

const MockComponent = defineComponent({
  name: 'mock-component',
  mixins: [eventsMixin],
  // eslint-disable-next-line
  render() {},
});

describe('eventsMixin.ts', () => {
  it('should emits dropdown:opened', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.onOpenDropdown();
    expect(wrapper.emitted()).toHaveProperty('dropdown:opened');
  });
  it('should emits dropdown:closed', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.dropdownOpen = true;
    wrapper.vm.onCloseDropdown();
    expect(wrapper.emitted()).toHaveProperty('dropdown:closed');
  });
  it('should emits dropdown:blur', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.dropdownOpen = true;
    wrapper.vm.onBlur();
    expect(wrapper.emitted()).toHaveProperty('dropdown:closed');
    expect(wrapper.emitted()).toHaveProperty('dropdown:blur');
  });
  it('should emits dropdown:clear and clear modelvalue', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.onClear();
    expect(wrapper.emitted()).toHaveProperty('dropdown:clear');
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([null]);
  });
  it('should emits update:modelvalue on Select', () => {
    const option = {id: 1, label: 'test'};
    const wrapper = mount(MockComponent, {});
    wrapper.vm.onSelect(option);
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([option]);
  });
  it('should emits update:modelvalue as array on Select Multiple', () => {
    const option = {id: 1, label: 'test'};
    const wrapper = mount(MockComponent, {
      props: {
        modelValue: [],
      },
    });
    wrapper.vm.onSelect(option);
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([[option]]);
  });
  it('should emits update:modelvalue on Remove Selected', () => {
    const option = {id: 1, label: 'test'};
    const wrapper = mount(MockComponent, {
      props: {
        modelValue: [option],
      },
    });
    wrapper.vm.onRemoveSelected(option);
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([[]]);
  });

  it('should not emit dropdown:opened if disabled', () => {
    const wrapper = mount(MockComponent, {
      props: {
        disabled: true,
      },
    });
    wrapper.vm.onOpenDropdown();
    expect(wrapper.emitted('dropdown:opened')).toBeFalsy();
  });
  it('should not emit dropdown:closed if disabled', () => {
    const wrapper = mount(MockComponent, {
      props: {
        disabled: true,
      },
    });
    wrapper.vm.onCloseDropdown();
    expect(wrapper.emitted('dropdown:closed')).toBeFalsy();
  });
});
