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
  <!-- Search -->
  <div class="oxd-main-menu --fixed">
    <div class="oxd-main-menu-search">
      <oxd-icon
        name="search"
        type="svg"
        width="22"
        height="22"
        class="oxd-menu-icon"
      ></oxd-icon>
      <oxd-input
        v-model="searchTerm"
        :placeholder="t('general.search', 'Search')"
        :class="{toggled: toggle}"
      />
      <oxd-icon-button
        :name="toggle ? 'chevron-right' : 'chevron-left'"
        class="oxd-main-menu-button"
        role="none"
        @click="onClickCollapse"
      />
    </div>
    <hr class="oxd-main-menu-divider" />
  </div>
  <!-- Search -->

  <!-- Nav Items  -->
  <ul class="oxd-main-menu">
    <oxd-main-menu-item
      v-for="(menuItem, index) in filteredMenuItems"
      :key="`oxd-main-menu-${index}`"
      :url="menuItem.url"
      :active="menuItem.active"
      :collapsed="toggle"
      :name="menuItem.name"
      :icon="menuItem.icon"
    ></oxd-main-menu-item>
  </ul>
</template>

<script lang="ts">
import MenuItem from './types';
import {defineComponent, PropType} from 'vue';
import MainMenuItem from './MainMenuItem.vue';
import usei18n from '../../../composables/usei18n';
import Icon from '@ohrm/oxd/core/components/Icon/Icon.vue';
import Input from '@ohrm/oxd/core/components/Input/Input.vue';
import IconButton from '@ohrm/oxd/core/components/Button/Icon.vue';

export default defineComponent({
  name: 'OxdMainMenu',

  components: {
    'oxd-icon': Icon,
    'oxd-input': Input,
    'oxd-icon-button': IconButton,
    'oxd-main-menu-item': MainMenuItem,
  },

  props: {
    url: {
      type: String,
      required: false,
      default: '/',
    },
    toggle: {
      type: Boolean,
      required: false,
      default: false,
    },
    menuItems: {
      type: Array as PropType<MenuItem[]>,
      required: false,
      default: () => [],
    },
  },

  emits: ['collapse'],

  setup() {
    return {
      ...usei18n(),
    };
  },

  data() {
    return {
      searchTerm: '',
    };
  },

  computed: {
    classes(): object {
      return {
        toggled: this.toggle,
      };
    },
    filteredMenuItems(): MenuItem[] {
      const escapedSearchTerm = this.searchTerm.replace(
        /[/\-\\^$*+?.()|[\]{}]/g,
        '\\$&',
      );
      const filter = new RegExp(escapedSearchTerm, 'i');
      return this.menuItems.filter((item) => item.name.match(filter));
    },
  },

  methods: {
    onClickCollapse() {
      this.$emit('collapse');
      // trigger resize event for body resize event listners
      // timeout delay is added for sidebar animation 0.3s
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 350);
    },
  },
});
</script>

<style src="./main-menu.scss" lang="scss" scoped></style>
