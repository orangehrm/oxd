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
  <header class="oxd-topbar">
    <div class="oxd-topbar-header">
      <!-- Context Header -->
      <div class="oxd-topbar-header-title">
        <i :class="iconClasses"></i>
        <oxd-icon
          name="list"
          class="oxd-topbar-header-hamburger"
          @click="$emit('collapse')"
        />
        <oxd-text tag="h6" class="oxd-topbar-header-title-text">
          {{ contextTitle }}
        </oxd-text>
      </div>
      <!-- User Menu Area -->
      <div class="oxd-topbar-header-userarea">
        <ul>
          <oxd-user-dropdown
            :user="user"
            :logoutUrl="logoutUrl"
          ></oxd-user-dropdown>
        </ul>
      </div>
    </div>
    <div class="oxd-topbar-body">
      <oxd-navigation-level-one
        :menu-items="menuItems"
      ></oxd-navigation-level-one>
    </div>
  </header>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {TopMenuItem} from './menuItem.interface';
import {User} from './user.interface';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import NavigationLevelOne from '@orangehrm/oxd/core/components/Topbar/NavigationLevelOne.vue';
import UserDropdown from '@orangehrm/oxd/core/components/Topbar/UserDropdown.vue';

export default defineComponent({
  name: 'oxd-top-bar',

  emits: ['collapse'],

  props: {
    contextTitle: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'icon-home',
    },
    menuItems: {
      type: Object as PropType<TopMenuItem[]>,
    },
    user: {
      type: Object as PropType<User>,
    },
    logoutUrl: {
      type: String,
      default: '#',
    },
  },

  components: {
    'oxd-text': Text,
    'oxd-navigation-level-one': NavigationLevelOne,
    'oxd-icon': Icon,
    'oxd-user-dropdown': UserDropdown,
  },

  computed: {
    iconClasses(): object {
      return {
        'oxd-menu-icon': true,
        [`${this.icon}-w`]: true,
      };
    },
  },
});
</script>

<style src="./topbar.scss" lang="scss" scoped></style>
