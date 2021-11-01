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

<template>
  <oxd-layout
    :user="user"
    context-title="Personal Information Manager"
    :sidepanel-menu-items="sidepanelMenuItems"
    :topbar-menu-items="topbarMenuItems"
    :brand-image-src="brandImageSrc"
  >
    <p class="context-default">
      slot for context
    </p>
    <template v-slot:user-actions>
      <li role="none">
        <a href="#" role="menuitem" class="oxd-userdropdown-link">
          Logout
        </a>
      </li>
    </template>
    <template v-slot:footer>
      <p class="context-footer">
        slot for footer
      </p>
      <br />
    </template>
  </oxd-layout>
</template>

<script>
import {topMenuItems, sidePanelItems} from './mockdata';
import Layout from '@orangehrm/oxd/core/components/Layout/Layout';

export default {
  name: 'Layout',
  components: {
    'oxd-layout': Layout,
  },
  data() {
    return {
      brandImageSrc: require('@orangehrm/oxd/assets/images/orange.png'),
      user: {
        firstName: 'Jeff',
        lastName: 'Winger',
        profImgSrc: '',
      },
      sidepanelMenuItems: sidePanelItems,
      topbarMenuItems: topMenuItems,
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
.context-footer {
  background-color: rgb(160 210 249);
  text-align: center;
  margin: 0 3rem;
}
</style>
