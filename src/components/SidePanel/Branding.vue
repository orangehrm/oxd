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
  <a class="oxd-brand" :class="classes" :href="url">
    <div v-show="toggle" class="oxd-brand-logo">
      <img alt="client brand logo" :src="logoSrc" />
    </div>
    <div class="oxd-brand-banner" :class="classes">
      <img alt="client brand banner" :src="bannerSrc" />
    </div>
  </a>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'OxdBranding',

  props: {
    url: {
      type: String,
      required: false,
      default: '/',
    },
    logoSrc: {
      type: String,
      required: false,
      default: '',
    },
    bannerSrc: {
      type: String,
      required: false,
      default: '',
    },
    toggle: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    classes(): object {
      return {
        toggled: this.toggle,
      };
    },
  },
});
</script>

<style src="./branding.scss" lang="scss" scoped></style>
