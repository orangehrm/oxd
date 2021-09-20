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
 
import {mount, shallowMount} from '@vue/test-utils';
import SidePanel from '@orangehrm/oxd/core/components/SidePanel/SidePanel.vue';
import MainMenu from '@orangehrm/oxd/core/components/SidePanel/MainMenu.vue';
import MainMenuItem from '@orangehrm/oxd/core/components/SidePanel/MainMenuItem.vue';

describe('SidePanel.vue', () => {
  it('renders OXD Side Panel', () => {
    const wrapper = shallowMount(SidePanel);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render OXD Side Panel with menu items', async () => {
    const menuItems = [
      {
        name: 'Home',
        url: '#',
        icon: 'icon-home',
        active: false,
      },
      {
        name: 'PIM',
        url: '#',
        icon: 'icon-pim',
        active: true,
      },
      {
        name: 'Time',
        url: '#',
        icon: 'icon-time',
        active: false,
      },
    ];
    const wrapper = mount(SidePanel, {
      props: {menuItems},
    });
    const menuElems = wrapper.findAllComponents(MainMenuItem);
    expect(menuElems.length).toBe(3);
    expect(menuElems[0].findAll('a')[1].classes()).toContain('active');
  });

  it('should emit OXD Side Panel collapse event', () => {
    const menuItems = [
      {
        name: 'Home',
        url: '#',
        icon: 'icon-home',
        active: false,
      },
    ];
    const wrapper = mount(SidePanel, {
      props: {menuItems},
    });
    wrapper
      .findComponent(MainMenu)
      .find('.oxd-main-menu-button')
      .trigger('click');
    expect(wrapper.emitted('collapse')).toBeTruthy();
  });
});
