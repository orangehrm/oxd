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
      <li role="none">
        <a :href="logoutUrl" role="menuitem" class="oxd-userdropdown-link">
          <oxd-icon name="box-arrow-right" :with-container="false" />Logout
        </a>
      </li>
    </template>
  </oxd-dropdown-menu>
  <!-- User dropdown -->
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {User} from './user.interface';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import DropdownMenu from '@orangehrm/oxd/core/components/DropdownMenu/DropdownMenu.vue';

export default defineComponent({
  name: 'oxd-user-dropdown',

  props: {
    user: {
      type: Object as PropType<User>,
    },
    logoutUrl: {
      type: String,
      default: '#',
    },
  },

  components: {
    'oxd-icon': Icon,
    'oxd-dropdown-menu': DropdownMenu,
  },

  computed: {
    profilePicUrl() {
      return this.user.profImgSrc != ''
        ? this.user.profImgSrc
        : require('../../../assets/images/user-default-400.png').default;
    },
  },
});
</script>

<style src="./user-dropdown.scss" lang="scss" scoped></style>
<style lang="scss">
.oxd-userdropdown {
  & .oxd-dropdown-menu {
    right: 0;
    left: unset;
    top: 50px;
    min-width: 10rem;
  }
}
</style>
