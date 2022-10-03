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
import {mount} from '@vue/test-utils';
import TabPanel from '@ohrm/oxd/core/components/Tab/TabPanel.vue';
import TabContainer from '@ohrm/oxd/core/components/Tab/TabContainer.vue';

const Tabs = [
  h(
    TabPanel,
    {name: 'tab1'},
    {
      default: () => h('div', 'Tab 1'),
    },
  ),
  h(
    TabPanel,
    {name: 'tab2'},
    {
      default: () => h('div', 'Tab 2'),
    },
  ),
  h(
    TabPanel,
    {name: 'tab3'},
    {
      default: () => h('div', 'Tab 3'),
    },
  ),
];

describe('TabContainer.vue', () => {
  it('renders OXD Tab Container', () => {
    const wrapper = mount(TabContainer, {
      slots: {
        default: () => Tabs,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render OXD Tab Container with tabs', async () => {
    const wrapper = mount(TabContainer, {
      slots: {
        default: () => Tabs,
      },
    });
    const tabs = wrapper.findAll('.oxd-tab-segment');
    expect(tabs.length).toBe(3);
    expect(tabs[0].classes()).toContain('oxd-tab-segment--active');
  });

  it('should change current tab on click', async () => {
    const wrapper = mount(TabContainer, {
      slots: {
        default: () => Tabs,
      },
    });
    const tabs = wrapper.findAll('.oxd-tab-segment');
    await tabs[2].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['tab3']]);
  });

  it('should not change current tab on click disabled tab', async () => {
    const wrapper = mount(TabContainer, {
      slots: {
        default: () => [
          h(
            TabPanel,
            {name: 'tab1'},
            {
              default: () => h('div', 'Tab 1'),
            },
          ),
          h(
            TabPanel,
            {name: 'tab2', disabled: true},
            {
              default: () => h('div', 'Tab 2'),
            },
          ),
        ],
      },
    });
    const tabs = wrapper.findAll('.oxd-tab-segment');
    await tabs[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should select current tab by default', async () => {
    const wrapper = mount(TabContainer, {
      props: {
        modelValue: 'tab2',
      },
      slots: {
        default: () => Tabs,
      },
    });
    const tabs = wrapper.findAll('.oxd-tab-segment');
    expect(tabs[1].classes()).toContain('oxd-tab-segment--active');
  });

  it('should select current tab by url', async () => {
    // eslint-disable-next-line no-global-assign
    window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost#tab2',
        hash: '#tab2',
      },
    });

    const wrapper = mount(TabContainer, {
      slots: {
        default: () => Tabs,
      },
    });
    expect(wrapper.emitted('update:modelValue')).toEqual([['tab2']]);
  });
});
