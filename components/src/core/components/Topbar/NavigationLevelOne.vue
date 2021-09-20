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
  <!-- Navigation Level one -->
  <nav class="oxd-topbar-body-nav" role="navigation" aria-label="Topbar Menu">
    <ul>
      <template v-for="(menuItem, index) in menuItems">
        <!-- Menu Item without Sub Menu-->
        <li
          :key="`nav-level1-${index}`"
          v-if="menuItem.children.length === 0"
          :class="menuClasses[index]"
        >
          <a class="oxd-topbar-body-nav-tab-item" :href="menuItem.url">{{
            menuItem.name
          }}</a>
        </li>
        <!-- Menu Item with Sub Menu -->
        <oxd-dropdown-menu
          :key="`nav-level1-${index}`"
          :class="menuClasses[index]"
          v-else
        >
          <span class="oxd-topbar-body-nav-tab-item"
            >{{ menuItem.name }}
            <oxd-icon name="caret-down-fill" :with-container="false" />
          </span>
          <template v-slot:content>
            <!-- Navigation Level two -->
            <li
              v-for="(subMenuItem, index) in menuItem.children"
              :key="`nav-level2-${index}`"
              role="none"
            >
              <a
                :href="subMenuItem.url"
                role="menuitem"
                class="oxd-topbar-body-nav-tab-link"
                >{{ subMenuItem.name }}</a
              >
            </li>
          </template>
        </oxd-dropdown-menu>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {TopMenuItem} from './menuItem.interface';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import DropdownMenu from '@orangehrm/oxd/core/components/DropdownMenu/DropdownMenu.vue';

export default defineComponent({
  name: 'oxd-navigation-level-one',

  props: {
    menuItems: {
      type: Object as PropType<TopMenuItem[]>,
    },
  },

  components: {
    'oxd-dropdown-menu': DropdownMenu,
    'oxd-icon': Icon,
  },

  computed: {
    menuClasses(): TopMenuItem[] {
      return this.menuItems.map(item => {
        return {
          'oxd-topbar-body-nav-tab': true,
          '--parent': item.children.length > 0,
          '--visited': item.active,
        };
      });
    },
  },
});
</script>

<style src="./topbar.scss" lang="scss" scoped></style>
