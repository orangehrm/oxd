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
import GlassButton from '@/components/Button/GlassButton.vue';

describe('Button > GlassButton.vue', () => {
  it('should renders OXD glass button', () => {
    const wrapper = mount(GlassButton, {
      props: {name: 'Post Video', icon: 'videoglass'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should disable OXD glass button', () => {
    const wrapper = mount(GlassButton, {
      props: {name: 'Post Photo', icon: 'cameraglass', disabled: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not emit on click, if oxd glass button is disabled', async () => {
    const wrapper = mount(GlassButton, {
      props: {name: 'Post Photo', icon: 'cameraglass', disabled: true},
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });
});
