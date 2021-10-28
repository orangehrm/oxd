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
        :brand-image-src="brandImageSrc"
      >
      </oxd-side-panel>
      <oxd-top-bar
        @collapse="onCollapse"
        :toggle="collapse"
        :context-title="contextTitle"
        :icon="icon"
        :menu-items="topbarMenuItems"
        :user="user"
        :logoutUrl="logoutUrl"
      ></oxd-top-bar>
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
import Topbar from '@orangehrm/oxd/core/components/Topbar/Topbar.vue';
import SidePanel from '@orangehrm/oxd/core/components/SidePanel/SidePanel.vue';
import overlay from '@orangehrm/oxd/core/components/Dialog/Overlay.vue';
import MenuItem from '../SidePanel/menuItem.interface';
import {TopMenuItem} from '../Topbar/menuItem.interface';
import {User} from '../Topbar/user.interface';

export default defineComponent({
  name: 'oxd-layout',

  props: {
    icon: {
      type: String,
      default: '',
    },
    contextTitle: {
      type: String,
      required: true,
    },
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
    brandImageSrc: {
      type: String,
      required: true,
    },
    logoutUrl: {
      type: String,
      default: '#',
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
<style lang="scss">
@import '../../../styles';

body {
  display: block;
  margin: 0;
}

html,
body {
  height: 100%;
  @include oxd-scrollbar();
}

#app,
#root {
  height: inherit;
}
</style>
