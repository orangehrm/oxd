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
    :brand-logo-src="brandLogoSrc"
    :brand-banner-src="brandBannerSrc"
    :breadcrumb="breadcrumb"
    :show-upgrade="true"
    upgrade-label="Upgrade"
    upgrade-url="https://orangehrm.com"
  >
    <p class="context-default">slot for context</p>
    <template #topbar-header-right-area>
      <div class="orangehrm-slot-button-container">
        <a class="orangehrm-slot-button-link" href="https://orangehrm.com">
          <oxd-glass-button
            label="OHRM"
            size="large"
            class="orangehrm-slot-button-button"
          >
            <template #icon>
              <oxd-icon
                type="svg"
                name="upgrade"
                class="orangehrm-slot-button-icon"
              ></oxd-icon>
            </template>
          </oxd-glass-button>
        </a>
      </div>
    </template>
    <template #user-actions>
      <li role="none">
        <a href="#" role="menuitem" class="oxd-userdropdown-link"> Logout </a>
      </li>
    </template>
    <template #nav-actions>
      <oxd-icon-button name="question-lg" />
    </template>
    <template #footer>
      <p class="context-footer">slot for footer</p>
      <br />
    </template>
  </oxd-layout>
</template>

<script>
import {topMenuItems, sidePanelItems, breadcrumb} from './mockdata';
import Layout from '@/components/Layout/Layout.vue';
import IconButton from '@/components/Button/Icon.vue';
import {OxdGlassButton, OxdIcon} from '@/index';

export default {
  name: 'LayoutWithUpgrade',

  components: {
    'oxd-layout': Layout,
    'oxd-icon-button': IconButton,
    'oxd-glass-button': OxdGlassButton,
    'oxd-icon': OxdIcon,
  },

  data() {
    return {
      brandLogoSrc: '/images/orange.png',
      brandBannerSrc: '/images/orangehrm-logo.png',
      user: {
        firstName: 'Jeff',
        lastName: 'Winger',
        profImgSrc: '/images/user-default-400.png',
      },
      sidepanelMenuItems: sidePanelItems,
      topbarMenuItems: topMenuItems,
      breadcrumb: breadcrumb,
    };
  },
};
</script>

<style scoped lang="scss">
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

::v-deep(.oxd-topbar-header-userarea) {
  margin-left: unset;
  align-self: center;
}

.orangehrm-slot-button {
  &-container {
    margin-left: auto;
  }

  &-link {
    text-decoration: inherit;
    color: inherit;
    cursor: auto;
  }

  &-button {
    font-size: 0rem;
    padding-top: 0.9rem;
    padding-bottom: 0.9rem;
    padding-left: 1rem;
    padding-right: 0.4rem;
    align-self: center;
    @include oxd-respond-to('md') {
      color: $oxd-primary-one-color;
      font-size: 1.1rem;
      white-space: nowrap;
      padding-right: 1rem;
    }
  }

  &-icon {
    color: $oxd-primary-one-color;
    scale: 1.5;
  }
}
</style>
