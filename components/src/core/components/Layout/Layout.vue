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
  <div class="oxd-layout">
    <div class="oxd-layout-navigation">
      <oxd-side-panel
        @collapse="onCollapse"
        :toggle="collapse"
        :menu-items="sidepanelMenuItems"
        :brand-logo-src="brandLogoSrc"
        :brand-banner-src="brandBannerSrc"
        :home-url="homeUrl"
      >
      </oxd-side-panel>
      <oxd-top-bar
        @collapse="onCollapse"
        :toggle="collapse"
        :menu-items="topbarMenuItems"
        :user="user"
        :breadcrumb="breadcrumb"
      >
        <slot name="user-actions"></slot>
      </oxd-top-bar>
    </div>
    <div :class="containerClasses">
      <oxd-overlay
        @click="onCollapse"
        class="oxd-layout-overlay"
        :show="collapse"
      ></oxd-overlay>
      <div class="oxd-layout-context">
        <slot></slot>
      </div>
      <div class="oxd-layout-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import Topbar from '@ohrm/oxd/core/components/Topbar/Topbar.vue';
import SidePanel from '@ohrm/oxd/core/components/SidePanel/SidePanel.vue';
import overlay from '@ohrm/oxd/core/components/Dialog/Overlay.vue';
import MenuItem from '../SidePanel/types';
import {TopMenuItem, User, Breadcrumb} from '../Topbar/types';

export default defineComponent({
  name: 'oxd-layout',

  props: {
    user: {
      type: Object as PropType<User>,
    },
    sidepanelMenuItems: {
      type: Object as PropType<MenuItem[]>,
      required: true,
    },
    topbarMenuItems: {
      type: Object as PropType<TopMenuItem[]>,
      required: true,
    },
    brandLogoSrc: {
      type: String,
      required: true,
    },
    brandBannerSrc: {
      type: String,
      required: true,
    },
    homeUrl: {
      type: String,
      default: '/',
    },
    breadcrumb: {
      type: Object as PropType<Breadcrumb>,
      required: true,
    },
  },

  components: {
    'oxd-side-panel': SidePanel,
    'oxd-top-bar': Topbar,
    'oxd-overlay': overlay,
  },

  data() {
    return {
      collapse: false,
    };
  },

  methods: {
    onCollapse() {
      this.collapse = !this.collapse;
    },
  },

  computed: {
    containerClasses(): object {
      return {
        'oxd-layout-container': true,
        '--collapse': this.collapse,
      };
    },
  },
});
</script>

<style src="./layout.scss" lang="scss" scoped></style>
<style src="./layout-global.scss" lang="scss"></style>
