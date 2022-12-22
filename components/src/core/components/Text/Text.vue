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
  <component :is="tag" :class="classes" :style="style"><slot></slot></component>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {TAGS, Tags, TAG_P, TYPES, TextTypes} from './types';

export default defineComponent({
  name: 'OxdText',

  props: {
    tag: {
      type: String,
      default: TAG_P,
      validator: function (value: Tags) {
        return TAGS.indexOf(value) !== -1;
      },
    },
    style: {
      type: Object,
    },
    type: {
      type: String,
      validator: function (value?: TextTypes) {
        if (value === undefined || value === null) {
          return true;
        }
        return TYPES.indexOf(value) !== -1;
      },
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-text': true,
        [`oxd-text--${this.tag}`]: true,
        [`oxd-text--${this.type}`]: this.type,
      };
    },
  },
});
</script>

<style src="./text.scss" lang="scss" scoped></style>
