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
    <div :class="headerClasses">
      <!-- Context Header -->
      <div class="oxd-topbar-header-title">
        <oxd-icon
          name="list"
          class="oxd-topbar-header-hamburger"
          @click="$emit('collapse')"
        />
        <span class="oxd-topbar-header-breadcrumb">
          <oxd-text tag="h6" class="oxd-topbar-header-breadcrumb-module">
            {{ breadcrumb.moduleName }}
          </oxd-text>
          <oxd-text
            v-if="breadcrumb.level"
            tag="h6"
            class="oxd-topbar-header-breadcrumb-level"
          >
            {{ breadcrumb.level }}
          </oxd-text>
        </span>
      </div>
      <!-- User Menu Area -->
      <div class="oxd-topbar-header-userarea">
        <ul>
          <oxd-user-dropdown :user="user">
            <slot></slot>
          </oxd-user-dropdown>
        </ul>
      </div>
    </div>
    <div :class="bodyClasses">
      <oxd-navigation :menu-items="menuItems"></oxd-navigation>
    </div>
  </header>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {TopMenuItem, User, Breadcrumb} from './types';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Navigation from '@orangehrm/oxd/core/components/Topbar/Navigation.vue';
import UserDropdown from '@orangehrm/oxd/core/components/Topbar/UserDropdown.vue';

export default defineComponent({
  name: 'oxd-top-bar',

  emits: ['collapse'],

  props: {
    toggle: {
      type: Boolean,
      default: false,
    },
    menuItems: {
      type: Object as PropType<TopMenuItem[]>,
    },
    user: {
      type: Object as PropType<User>,
    },
    breadcrumb: {
      type: Object as PropType<Breadcrumb>,
    },
  },

  components: {
    'oxd-text': Text,
    'oxd-icon': Icon,
    'oxd-navigation': Navigation,
    'oxd-user-dropdown': UserDropdown,
  },

  computed: {
    headerClasses(): object {
      return {
        'oxd-topbar-header': true,
        toggled: this.toggle,
      };
    },
    bodyClasses(): object {
      return {
        'oxd-topbar-body': true,
        toggled: this.toggle,
      };
    },
  },
});
</script>

<style src="./topbar.scss" lang="scss" scoped></style>
