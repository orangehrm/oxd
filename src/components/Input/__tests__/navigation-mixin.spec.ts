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
import {describe, expect, it} from 'vitest';
import navigationMixin from '@/components/Input/Select/navigation-mixin';

const MockComponent = defineComponent({
  name: 'MockComponent',
  mixins: [navigationMixin],
  data() {
    return {dropdownOpen: true};
  },
  computed: {
    computedOptions() {
      return [
        {id: 1, label: 'apple'},
        {id: 2, label: 'banana'},
        {id: 3, label: 'cherry'},
        {id: 4, label: 'avocado'},
      ];
    },
  },
  // eslint-disable-next-line
  render() {},
});

describe('navigationMixin.ts', () => {
  it('should increment pointer onSelectDown', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.pointer = -1;
    wrapper.vm.onSelectDown();
    expect(wrapper.vm.pointer).toStrictEqual(0);
  });
  it('should decrement pointer onSelectUp', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.pointer = 1;
    wrapper.vm.onSelectUp();
    expect(wrapper.vm.pointer).toStrictEqual(0);
  });
  it('should match pointer to keypress', () => {
    const wrapper = mount(MockComponent, {});
    const keydownEvent = new KeyboardEvent('keydown', {key: 'b'});
    wrapper.vm.onKeypress(keydownEvent);
    expect(wrapper.vm.pointer).toStrictEqual(1);
  });
  it('should match pointer to keypress on repeat keypress', () => {
    const wrapper = mount(MockComponent, {});
    const keydownEvent = new KeyboardEvent('keydown', {key: 'a'});
    wrapper.vm.onKeypress(keydownEvent);
    expect(wrapper.vm.pointer).toStrictEqual(0);
    wrapper.vm.onKeypress(keydownEvent);
    expect(wrapper.vm.pointer).toStrictEqual(3);
    wrapper.vm.onKeypress(keydownEvent);
    expect(wrapper.vm.pointer).toStrictEqual(0);
  });
  it('should not increment pointer beyond options length', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.pointer = 3;
    wrapper.vm.onSelectDown();
    expect(wrapper.vm.pointer).toStrictEqual(3);
  });
  it('should not decrement pointer beyond options length', () => {
    const wrapper = mount(MockComponent, {});
    wrapper.vm.pointer = 0;
    wrapper.vm.onSelectUp();
    expect(wrapper.vm.pointer).toStrictEqual(0);
  });
});
