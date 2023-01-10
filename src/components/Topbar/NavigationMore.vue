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
  <oxd-dropdown-menu class="oxd-topbar-body-nav-tab" @dropdown:closed="onClose">
    <span class="oxd-topbar-body-nav-tab-item">
      {{ t('general.more', 'More') }}
      <oxd-icon name="three-dots-vertical" :with-container="false" />
    </span>
    <template #content>
      <div v-for="(menuItem, index) in menuItems" :key="`nav-level2-${index}`">
        <li @click="onClickMenu($event, menuItem, index)">
          <a href="#" class="oxd-topbar-body-nav-tab-link --more">
            {{ menuItem.name }}
            <oxd-icon
              v-show="menuItem.children.length > 0"
              :name="index === expandedIndex ? 'chevron-up' : 'chevron-down'"
              :with-container="false"
            />
          </a>
        </li>
        <ul
          v-if="expandedIndex === index"
          class="oxd-topbar-body-nav-tab-accordian"
        >
          <li
            v-for="(subMenuItem, _index) in menuItem.children"
            :key="`nav-level3-${_index}`"
            @click="onClickMenu($event, subMenuItem, -1)"
          >
            <a href="#">
              {{ subMenuItem.name }}
            </a>
          </li>
        </ul>
      </div>
    </template>
  </oxd-dropdown-menu>
</template>

<script lang="ts">
import type {PropType} from 'vue';
import {defineComponent, ref} from 'vue';
import usei18n from '@/composables/usei18n';
import Icon from '@/components/Icon/Icon.vue';
import type {SubMenuItem, TopMenuItem} from './types';
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu.vue';

export default defineComponent({
  name: 'OxdNavigationMore',

  components: {
    'oxd-icon': Icon,
    'oxd-dropdown-menu': DropdownMenu,
  },

  props: {
    menuItems: {
      type: Array as PropType<TopMenuItem[]>,
      required: false,
      default: () => [],
    },
  },

  setup() {
    const expandedIndex = ref(-1);
    const onClickMenu = (
      $event: MouseEvent,
      item: TopMenuItem | SubMenuItem,
      index: number,
    ) => {
      if (
        !(item as TopMenuItem).children ||
        (item as TopMenuItem).children.length === 0
      ) {
        window.location.replace(item.url);
      } else {
        $event.preventDefault();
        $event.stopPropagation();
        expandedIndex.value = expandedIndex.value === index ? -1 : index;
      }
    };

    const onClose = () => {
      expandedIndex.value = -1;
    };

    return {
      onClose,
      onClickMenu,
      expandedIndex,
      ...usei18n(),
    };
  },
});
</script>

<style src="./navigation-link.scss" lang="scss"></style>
