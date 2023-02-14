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
  <li
    v-if="menuItem.children.length === 0"
    @click="onClickMenu($event, menuItem)"
  >
    <a class="oxd-topbar-body-nav-tab-item" href="#">
      {{ menuItem.name }}
    </a>
  </li>
  <oxd-dropdown-menu v-else>
    <span class="oxd-topbar-body-nav-tab-item">
      {{ menuItem.name }}
      <oxd-icon name="chevron-down" :with-container="false" />
    </span>
    <template #content>
      <li
        v-for="(subMenuItem, index) in menuItem.children"
        :key="`nav-level2-${index}`"
        @click="onClickMenu($event, subMenuItem)"
      >
        <a href="#" role="menuitem" class="oxd-topbar-body-nav-tab-link">
          {{ subMenuItem.name }}
        </a>
      </li>
    </template>
  </oxd-dropdown-menu>
</template>

<script lang="ts">
import type {PropType} from 'vue';
import {defineComponent} from 'vue';
import Icon from '@/components/Icon/Icon.vue';
import type {SubMenuItem, TopMenuItem} from './types';
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu.vue';

export default defineComponent({
  name: 'OxdNavigationLink',

  components: {
    'oxd-icon': Icon,
    'oxd-dropdown-menu': DropdownMenu,
  },

  props: {
    menuItem: {
      type: Object as PropType<TopMenuItem>,
      required: true,
    },
  },

  setup() {
    const onClickMenu = (
      $event: MouseEvent,
      item: TopMenuItem | SubMenuItem,
    ) => {
      if (
        !(item as TopMenuItem).children ||
        (item as TopMenuItem).children.length === 0
      ) {
        window.location.replace(item.url);
      } else {
        $event.preventDefault();
        $event.stopPropagation();
      }
    };

    return {
      onClickMenu,
    };
  },
});
</script>

<style src="./navigation-link.scss" lang="scss"></style>
