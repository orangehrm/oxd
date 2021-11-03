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
  <!-- User dropdown -->
  <oxd-dropdown-menu class="oxd-userdropdown">
    <span class="oxd-userdropdown-tab">
      <img
        alt="profile picture"
        class="oxd-userdropdown-img"
        :src="profilePicUrl"
      />
      <p class="oxd-userdropdown-name">
        {{ user.firstName }} {{ user.lastName }}
      </p>
    </span>
    <template v-slot:content>
      <slot></slot>
    </template>
  </oxd-dropdown-menu>
  <!-- User dropdown -->
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {User} from './types';
import DropdownMenu from '@orangehrm/oxd/core/components/DropdownMenu/DropdownMenu.vue';

export default defineComponent({
  name: 'oxd-user-dropdown',

  props: {
    user: {
      type: Object as PropType<User>,
    },
  },

  components: {
    'oxd-dropdown-menu': DropdownMenu,
  },

  computed: {
    profilePicUrl() {
      return this.user.profImgSrc != ''
        ? this.user.profImgSrc
        : require('../../../assets/images/user-default-400.png');
    },
  },
});
</script>

<style src="./user-dropdown.scss" lang="scss" scoped></style>
<style src="./user-dropdown-global.scss" lang="scss"></style>
