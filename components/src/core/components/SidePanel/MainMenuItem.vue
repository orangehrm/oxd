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
  <li class="oxd-main-menu-item-wrapper">
    <a :class="menuClasses" :href="url">
      <i :class="iconClasses"></i>
      <oxd-text
        tag="span"
        :class="{'oxd-main-menu-item--name': true, active: active}"
        >{{ name }}</oxd-text
      >
    </a>
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';

export default defineComponent({
  name: 'oxd-main-menu-item',

  props: {
    url: {
      type: String,
      default: '#',
    },
    active: {
      type: Boolean,
      default: false,
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'icon-home',
    },
  },

  components: {
    'oxd-text': Text,
  },

  computed: {
    iconClasses(): object {
      return {
        'oxd-menu-icon': true,
        [this.icon]: !this.active,
        [`${this.icon}-w`]: this.active,
      };
    },
    menuClasses(): object {
      return {
        'oxd-main-menu-item': true,
        active: this.active,
        toggle: this.collapsed,
      };
    },
  },
});
</script>

<style src="./main-menu.scss" lang="scss" scoped></style>
<style lang="scss">
@import '../../../styles/colors';
.oxd-main-menu-button i {
  color: $oxd-white-color !important;
  font-size: 10px;
}
</style>
