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
 
import Topbar from '@orangehrm/oxd/core/components/Topbar/Topbar.vue';

export default {
  title: 'Example/Topbar',
  component: Topbar,
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-top-bar': Topbar},
  template: `<oxd-top-bar v-bind="args"/>`,
});

const argTypes = {
  menuItems: {control: {type: 'object'}},
  contextTitle: {control: {type: 'text'}},
};

export const Default = Template.bind({});
Default.args = {
  menuItems: [
    {
      name: 'Employee List',
      url: '#',
      active: false,
      children: [],
    },
    {
      name: 'Manage Data',
      url: '',
      active: true,
      children: [
        {
          name: 'Job Titles',
          url: '#',
        },
        {
          name: 'User Management',
          url: '#',
        },
        {
          name: 'Job Categories',
          url: '#',
        },
      ],
    },
    {
      name: 'Reports',
      url: '',
      active: false,
      children: [
        {
          name: 'Job Titles',
          url: '#',
        },
        {
          name: 'User Management',
          url: '#',
        },
        {
          name: 'Job Categories',
          url: '#',
        },
      ],
    },
  ],
  contextTitle: 'Personal Information Manager',
  user: {
    firstName: 'Jeff',
    lastName: 'Winger',
    profImgSrc: '',
  },
};
Default.argTypes = argTypes;
