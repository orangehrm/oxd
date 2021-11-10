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
  <div class="oxd-table-header-sort">
    <oxd-icon-button
      :withContainer="false"
      :name="sortIcon"
      class="oxd-table-header-sort-icon"
      @click="openDropdown"
    />
    <div
      v-click-outside="closeDropdown"
      v-show="isActive"
      :class="classes"
      role="dropdown"
    >
      <ul @click.stop="closeDropdown" role="menu">
        <li
          class="oxd-table-header-sort-dropdown-item"
          @click="$emit('order', 'ASC')"
        >
          <oxd-icon name="sort-alpha-down" />
          <oxd-text tag="span">Ascending</oxd-text>
        </li>
        <li
          class="oxd-table-header-sort-dropdown-item"
          @click="$emit('order', 'DESC')"
        >
          <oxd-icon name="sort-alpha-up" />
          <oxd-text tag="span">Decending</oxd-text>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {Order} from '../types';
import {defineComponent} from 'vue';
import Text from '@ohrm/oxd/core/components/Text/Text.vue';
import Icon from '@ohrm/oxd/core/components/Icon/Icon.vue';
import IconButton from '@ohrm/oxd/core/components/Button/Icon.vue';
import clickOutsideDirective from '../../../../directives/click-outside';

export default defineComponent({
  name: 'oxd-card-th-sort',

  inheritAttrs: false,

  props: {
    order: {
      type: String,
      required: false,
    },
  },

  emits: ['order'],

  components: {
    'oxd-text': Text,
    'oxd-icon': Icon,
    'oxd-icon-button': IconButton,
  },

  directives: {
    'click-outside': clickOutsideDirective,
  },

  data() {
    return {
      isActive: false,
    };
  },

  methods: {
    openDropdown() {
      this.isActive = true;
    },
    closeDropdown() {
      if (this.isActive) {
        this.isActive = false;
      }
    },
  },

  computed: {
    sortIcon(): string {
      let icon = '';
      if (this.order !== undefined) {
        switch (this.order as Order) {
          case 'ASC':
            icon = 'sort-alpha-down';
            break;
          case 'DESC':
            icon = 'sort-alpha-up';
            break;
          default:
            icon = 'arrow-down-up';
        }
      }
      return icon;
    },

    classes(): object {
      return {
        '--active': this.isActive,
        'oxd-table-header-sort-dropdown': true,
      };
    },
  },
});
</script>

<style src="./table-header-sort-dropdown.scss" lang="scss" scoped></style>
