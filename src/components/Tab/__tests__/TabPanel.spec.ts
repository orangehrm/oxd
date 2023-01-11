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

import {h} from 'vue';
import {describe, expect, it} from 'vitest';
import {mount, shallowMount} from '@vue/test-utils';
import TabPanel from '@/components/Tab/TabPanel.vue';

describe('TabPanel.vue', () => {
  it('renders OXD Tab Panel', () => {
    const wrapper = shallowMount(TabPanel, {
      props: {
        name: 'test',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render OXD Tab Panel with content', async () => {
    const wrapper = mount(TabPanel, {
      props: {
        name: 'test',
      },
      slots: {
        default: () => h('div', 'Main Content'),
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit OXD Tab activate event', () => {
    const wrapper = shallowMount(TabPanel, {
      props: {
        name: 'test',
      },
    });
    expect(wrapper.emitted('activate')).toBeTruthy();
  });

  it('should emit OXD Tab deactivate event', () => {
    const wrapper = shallowMount(TabPanel, {
      props: {
        name: 'test',
      },
    });
    wrapper.unmount();
    expect(wrapper.emitted('deactivate')).toBeTruthy();
  });
});
