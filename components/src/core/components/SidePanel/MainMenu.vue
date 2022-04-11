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
        @click="onClickCollapse"
        :name="toggle ? 'chevron-right' : 'chevron-left'"
        class="oxd-main-menu-button"
        role="none"
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
import {defineComponent, PropType} from 'vue';
import MenuItem from './types';
import MainMenuItem from './MainMenuItem.vue';
import Icon from '@ohrm/oxd/core/components/Icon/Icon.vue';
import Input from '@ohrm/oxd/core/components/Input/Input.vue';
import IconButton from '@ohrm/oxd/core/components/Button/Icon.vue';
import usei18n from '../../../composables/usei18n';

export default defineComponent({
  name: 'oxd-main-menu',

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

  props: {
    url: {
      type: String,
      default: '/',
    },
    toggle: {
      type: Boolean,
      default: false,
    },
    menuItems: {
      type: Object as PropType<MenuItem[]>,
    },
  },

  components: {
    'oxd-icon': Icon,
    'oxd-input': Input,
    'oxd-icon-button': IconButton,
    'oxd-main-menu-item': MainMenuItem,
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

  computed: {
    classes(): object {
      return {
        toggled: this.toggle,
      };
    },
    filteredMenuItems(): MenuItem[] {
      const filter = new RegExp(this.searchTerm, 'i');
      return this.menuItems.filter(item => item.name.match(filter));
    },
  },
});
</script>

<style src="./main-menu.scss" lang="scss" scoped></style>
