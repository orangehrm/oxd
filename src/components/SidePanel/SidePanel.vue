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
  <aside class="oxd-sidepanel" :class="classes">
    <nav class="oxd-navbar-nav" role="navigation" aria-label="Sidepanel">
      <div class="oxd-sidepanel-header">
        <oxd-branding
          :toggle="toggle"
          :logo-src="brandLogoSrc"
          :banner-src="brandBannerSrc"
          :url="homeUrl"
        />
        <oxd-icon
          name="x"
          class="oxd-sidepanel-header-close"
          @click="$emit('collapse')"
        />
      </div>
      <div class="oxd-sidepanel-body">
        <oxd-main-menu
          :toggle="toggle"
          :menu-items="menuItems"
          @collapse="$emit('collapse')"
        />
      </div>
    </nav>
  </aside>
</template>

<script lang="ts">
import type MenuItem from './types';
import Branding from './Branding.vue';
import MainMenu from './MainMenu.vue';
import type {PropType} from 'vue';
import {defineComponent} from 'vue';
import Icon from '@/components/Icon/Icon.vue';

export default defineComponent({
  name: 'OxdSidePanel',

  components: {
    'oxd-icon': Icon,
    'oxd-branding': Branding,
    'oxd-main-menu': MainMenu,
  },

  props: {
    toggle: {
      type: Boolean,
      required: false,
      default: false,
    },
    brandLogoSrc: {
      type: String,
      required: false,
      default: '',
    },
    brandBannerSrc: {
      type: String,
      required: false,
      default: '',
    },
    homeUrl: {
      type: String,
      required: false,
      default: '/',
    },
    menuItems: {
      type: Array as PropType<MenuItem[]>,
      required: false,
      default: () => [],
    },
  },

  emits: ['collapse'],

  computed: {
    classes(): object {
      return {
        toggled: this.toggle,
      };
    },
  },
});
</script>

<style src="./sidepanel.scss" lang="scss" scoped></style>
