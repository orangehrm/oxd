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
  <div role="listbox" class="oxd-select-dropdown">
    <oxd-select-option v-if="empty">
      {{ emptyText }}
    </oxd-select-option>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SelectOption from '@ohrm/oxd/core/components/Input/Select/SelectOption.vue';

export default defineComponent({
  name: 'oxd-select-dropdown',

  components: {
    'oxd-select-option': SelectOption,
  },

  props: {
    empty: {
      type: Boolean,
      default: false,
    },
    emptyText: {
      type: String,
      default: 'No results found',
    },
  },
});
</script>

<style src="./select-input.scss" lang="scss" scoped></style>
