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
  <hr
    :class="classes"
    :style="style"
    role="separator"
    :aria-orientation="areaOrientation"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {AREA_ORIENTATION_HORIZONTAL, AreaOrientation} from './types';

export default defineComponent({
  name: 'oxd-divider',

  props: {
    style: {
      type: Object,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-divider': true,
      };
    },
    areaOrientation(): AreaOrientation {
      return AREA_ORIENTATION_HORIZONTAL;
    },
  },
});
</script>

<style src="./divider.scss" lang="scss" scoped></style>
