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
  <component :is="card"></component>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useInjectTableProps} from '@/composables/useCardtable';
import {DEVICE_LG, DEVICE_XL} from '@/composables/useResponsive';
import DefaultCardWeb from '@/components/CardTable/Decorator/DefaultCardWeb.vue';
import DefaultCardMobile from '@/components/CardTable/Decorator/DefaultCardMobile.vue';

export default defineComponent({
  name: 'OxdTableDefaultCardContainer',

  components: {
    'oxd-table-default-card-web': DefaultCardWeb,
    'oxd-table-default-card-mobile': DefaultCardMobile,
  },

  setup() {
    return {
      ...useInjectTableProps(),
    };
  },

  computed: {
    card(): string {
      if (
        this.screenState.screenType === DEVICE_LG ||
        this.screenState.screenType === DEVICE_XL
      ) {
        return 'oxd-table-default-card-web';
      } else {
        return 'oxd-table-default-card-mobile';
      }
    },
  },
});
</script>
