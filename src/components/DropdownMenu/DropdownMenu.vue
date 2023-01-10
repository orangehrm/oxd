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
    v-click-outside="closeSubMenu"
    :class="{'--active': isActive}"
    @click="openSubmenu"
  >
    <slot></slot>
    <transition name="transition-fade-down">
      <ul
        v-if="isActive"
        class="oxd-dropdown-menu"
        role="menu"
        @click.stop="closeSubMenu"
      >
        <slot name="content"></slot>
      </ul>
    </transition>
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import clickOutsideDirective from '@/directives/click-outside';

export default defineComponent({
  name: 'OxdDropdownMenu',

  directives: {
    'click-outside': clickOutsideDirective,
  },

  emits: ['dropdown:opened', 'dropdown:closed'],

  data() {
    return {
      isActive: false,
    };
  },

  methods: {
    openSubmenu() {
      this.isActive = true;
      this.$emit('dropdown:opened');
    },
    closeSubMenu() {
      if (this.isActive) {
        this.isActive = false;
        this.$emit('dropdown:closed');
      }
    },
  },
});
</script>

<style src="./dropdown-menu.scss" lang="scss" scoped></style>
