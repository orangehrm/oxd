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
import SidePanel from '@ohrm/oxd/core/components/SidePanel/SidePanel.vue';
import MainMenu from '@ohrm/oxd/core/components/SidePanel/MainMenu.vue';

describe('SidePanel.vue', () => {
  it('should render OXD Side Panel with menu items', async () => {
    const menuItems = [
      {
        name: 'Dashboard',
        url: '#',
        icon: 'bolt',
        active: false,
      },
      {
        name: 'PIM',
        url: '#',
        icon: 'bolt',
        active: true,
      },
      {
        name: 'Time',
        url: '#',
        icon: 'bolt',
        active: false,
      },
    ];
    const wrapper = mount(SidePanel, {
      props: {menuItems},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit OXD Side Panel collapse event', () => {
    const menuItems = [
      {
        name: 'Dashboard',
        url: '#',
        icon: 'bolt',
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
