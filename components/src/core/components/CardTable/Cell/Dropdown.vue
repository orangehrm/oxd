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
  <oxd-dropdown-menu @click="noOp" class="oxd-table-dropdown">
    <oxd-icon-button name="three-dots-vertical" />
    <template v-slot:content>
      <li
        v-for="option in options"
        :key="option.context"
        @click="onClick($event, option.context)"
        class="oxd-table-dropdown-item"
      >
        <oxd-text tag="p">{{ option.label }}</oxd-text>
      </li>
    </template>
  </oxd-dropdown-menu>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import DropdownMenu from '@orangehrm/oxd/core/components/DropdownMenu/DropdownMenu.vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import {ActionCellEvent, DropdownOption} from './types';

export default defineComponent({
  name: 'oxd-table-dropdown',
  props: {
    options: {
      type: Array as PropType<DropdownOption[]>,
      default: () => [],
    },
  },
  components: {
    'oxd-icon-button': IconButton,
    'oxd-dropdown-menu': DropdownMenu,
    'oxd-text': Text,
  },
  methods: {
    noOp(e: MouseEvent) {
      // stop event bubbling and prevent emiting event until selected
      e.stopImmediatePropagation();
    },
    onClick(e: MouseEvent, context: string) {
      const event: ActionCellEvent = e;
      event.context = context;
      this.$emit('click', event);
    },
  },
});
</script>

<style src="./dropdown.scss" lang="scss" scoped></style>
