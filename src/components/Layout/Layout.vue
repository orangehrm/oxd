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
        :toggle="collapse"
        :home-url="homeUrl"
        :brand-logo-src="brandLogoSrc"
        :menu-items="sidepanelMenuItems"
        :brand-banner-src="brandBannerSrc"
        @collapse="onCollapse"
      >
      </oxd-side-panel>
      <oxd-top-bar
        :user="user"
        :toggle="collapse"
        :breadcrumb="breadcrumb"
        :menu-items="topbarMenuItems"
        :upgrade-label="upgradeLabel"
        :show-upgrade="showUpgrade"
        :upgrade-url="upgradeUrl"
        @collapse="onCollapse"
      >
        <template #user-context>
          <slot name="user-actions"></slot>
        </template>
        <template #nav-context>
          <slot name="nav-actions"></slot>
        </template>
      </oxd-top-bar>
    </div>
    <div :class="containerClasses">
      <oxd-overlay
        class="oxd-layout-overlay"
        :show="collapse"
        @click="onCollapse"
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
import type {PropType} from 'vue';
import {defineComponent} from 'vue';
import type MenuItem from '../SidePanel/types';
import Topbar from '@/components/Topbar/Topbar.vue';
import overlay from '@/components/Dialog/Overlay.vue';
import SidePanel from '@/components/SidePanel/SidePanel.vue';
import type {TopMenuItem, User, Breadcrumb} from '../Topbar/types';

export default defineComponent({
  name: 'OxdLayout',

  components: {
    'oxd-top-bar': Topbar,
    'oxd-overlay': overlay,
    'oxd-side-panel': SidePanel,
  },

  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
    sidepanelMenuItems: {
      type: Object as PropType<MenuItem[]>,
      required: true,
    },
    topbarMenuItems: {
      type: Object as PropType<TopMenuItem[]>,
      required: true,
    },
    breadcrumb: {
      type: Object as PropType<Breadcrumb>,
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
      required: false,
      default: '/',
    },
    upgradeLabel: {
      type: String,
      required: false,
      default: 'Upgrade',
    },
    showUpgrade: {
      type: Boolean,
      default: false,
    },
    upgradeUrl: {
      type: String,
      required: false,
      default: '/',
    },
  },

  data() {
    return {
      collapse: false,
    };
  },

  computed: {
    containerClasses(): object {
      return {
        'oxd-layout-container': true,
        '--collapse': this.collapse,
      };
    },
  },

  methods: {
    onCollapse() {
      this.collapse = !this.collapse;
    },
  },
});
</script>

<style src="./layout.scss" lang="scss" scoped></style>
<style src="./layout-global.scss" lang="scss"></style>
