<!--
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
-->
-->

<template>
  <oxd-layout
    icon="icon-pim"
    context-title="Personal Information Manager"
    :sidepanel-menu-items="sidepanelMenuItems"
    :topbar-menu-items="topbarMenuItems"
    :user="user"
    :brand-image-src="brandImageSrc"
  >
    <p class="context-default">
      slot for context
    </p>
  </oxd-layout>
</template>

<script>
import Layout from '@orangehrm/oxd/core/components/Layout/Layout';

export default {
  name: 'Layout',
  components: {
    'oxd-layout': Layout,
  },
  data() {
    return {
      brandImageSrc: require('@orangehrm/oxd/assets/images/orange.png').default,
      user: {
        firstName: 'Jeff',
        lastName: 'Winger',
        profImgSrc: '',
      },
      sidepanelMenuItems: [
        {
          name: 'Home',
          url: '#',
          icon: 'icon-home',
          active: true,
        },
        {
          name: 'PIM',
          url: '#',
          icon: 'icon-pim',
          active: false,
        },
        {
          name: 'Time',
          url: '#',
          icon: 'icon-time',
          active: false,
        },
        {
          name: 'Recruitment',
          url: '#',
          icon: 'icon-recruitment',
          active: false,
        },
        {
          name: 'Leave',
          url: '#',
          icon: 'icon-leave',
          active: false,
        },
        {
          name: 'Disciplines',
          url: '#',
          icon: 'icon-discipline',
          active: false,
        },
        {
          name: 'Training',
          url: '#',
          icon: 'icon-training',
          active: false,
        },
        {
          name: 'S & D',
          url: '#',
          icon: 'icon-development',
          active: false,
        },
        {
          name: 'On-boarding',
          url: '#',
          icon: 'icon-onboarding',
          active: false,
        },
        {
          name: 'Expense',
          url: '#',
          icon: 'icon-expences',
          active: false,
        },
        {
          name: 'Reports',
          url: '#',
          icon: 'icon-report',
          active: false,
        },
        {
          name: 'All Settings',
          url: '#',
          icon: 'icon-admin',
          active: false,
        },
      ],
      topbarMenuItems: [
        {
          name: 'Employee List',
          url: '#',
          active: false,
          children: [],
        },
        {
          name: 'Manage Data',
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
    };
  },
};
</script>

<style scoped>
.context-default {
  background-color: rgba(255, 0, 0, 0.37);
  text-align: center;
  padding: 25% 0;
}
</style>
