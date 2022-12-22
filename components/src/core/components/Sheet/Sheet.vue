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
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {SheetType, TYPES, TYPE_WHITE} from './types';

export default defineComponent({
  name: 'OxdSheet',

  props: {
    type: {
      type: String,
      default: TYPE_WHITE,
      validator: function (value: SheetType) {
        return TYPES.indexOf(value) !== -1;
      },
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    gutters: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-sheet': true,
        'oxd-sheet--rounded': this.rounded,
        'oxd-sheet--gutters': this.gutters,
        [`oxd-sheet--${this.type}`]: true,
      };
    },
  },
});
</script>

<style src="./sheet.scss" lang="scss" scoped></style>
