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
  <div class="oxd-toast-icon-container">
    <div :class="iconWrapClasses">
      <oxd-icon :name="iconName" class="oxd-toast-icon" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {toastMixin} from './toast-mixin';
import {ToastType, ICON_MAP} from './types';
import Icon from '@ohrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'OxdToastIcon',

  components: {
    'oxd-icon': Icon,
  },

  mixins: [toastMixin],

  computed: {
    iconWrapClasses(): object {
      return {
        'oxd-toast-icon-wrap': true,
        [`oxd-toast-icon-wrap--${this.type}`]: true,
      };
    },
    iconName(): string {
      return ICON_MAP[this.type as ToastType];
    },
  },
});
</script>

<style src="./icon.scss" lang="scss" scoped></style>
