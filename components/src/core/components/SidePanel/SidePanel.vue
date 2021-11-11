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
          :image-src="brandImageSrc"
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
          @collapse="$emit('collapse')"
          :toggle="toggle"
          :menu-items="menuItems"
        />
      </div>
    </nav>
  </aside>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import Branding from './Branding.vue';
import MainMenu from './MainMenu.vue';
import MenuItem from './types';
import Icon from '@ohrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'oxd-side-panel',

  emits: ['collapse'],

  props: {
    toggle: {
      type: Boolean,
      default: false,
    },
    brandImageSrc: {
      type: String,
      default: '',
    },
    homeUrl: {
      type: String,
      default: '/',
    },
    menuItems: {
      type: Object as PropType<MenuItem[]>,
      default: [],
    },
  },

  components: {
    'oxd-branding': Branding,
    'oxd-main-menu': MainMenu,
    'oxd-icon': Icon,
  },

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
