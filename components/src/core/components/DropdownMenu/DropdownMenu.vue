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
    @click="openSubmenu"
    v-click-outside="closeSubMenu"
    :class="{'--active': isActive}"
  >
    <slot></slot>
    <transition name="transition-fade-down">
      <ul
        @click.stop="closeSubMenu"
        v-if="isActive"
        class="oxd-dropdown-menu"
        role="menu"
      >
        <slot name="content"></slot>
      </ul>
    </transition>
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import clickOutsideDirective from '../../../directives/click-outside';

export default defineComponent({
  name: 'oxd-dropdown-menu',

  data() {
    return {
      isActive: false,
    };
  },

  directives: {
    'click-outside': clickOutsideDirective,
  },

  methods: {
    openSubmenu() {
      this.isActive = true;
    },
    closeSubMenu() {
      if (this.isActive) {
        this.isActive = false;
      }
    },
  },
});
</script>

<style src="./dropdown-menu.scss" lang="scss" scoped></style>
