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
    <div class="oxd-brand-icon">
      <img alt="orangehrm logo" :src="imageSrc" />
    </div>
    <div class="oxd-brand-text" :class="classes">
      <oxd-text tag="p" class="oxd-brand-text-main">Orange</oxd-text>
      <span><oxd-text tag="p" class="oxd-brand-text-sub">HRM</oxd-text></span>
    </div>
  </a>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';

export default defineComponent({
  name: 'oxd-branding',

  props: {
    url: {
      type: String,
      default: '/',
    },
    imageSrc: {
      type: String,
      default: '',
    },
    toggle: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    'oxd-text': Text,
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
