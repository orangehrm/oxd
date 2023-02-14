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
  <div v-if="show" :class="classes" role="alert">
    <div :class="contentClasses">
      <oxd-icon :name="iconName" class="oxd-alert-content-icon" />

      <oxd-text tag="p" class="oxd-alert-content-text">
        {{ message }}
      </oxd-text>
    </div>

    <div class="oxd-alert-action">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import type {AlertType} from './types';
import Text from '@/components/Text/Text.vue';
import Icon from '@/components/Icon/Icon.vue';
import {TYPE_DEFAULT, TYPES, ICON_MAP} from './types';

export default defineComponent({
  name: 'OxdAlert',

  components: {
    'oxd-text': Text,
    'oxd-icon': Icon,
  },

  props: {
    type: {
      type: String,
      required: false,
      default: TYPE_DEFAULT,
      validator: function (value: AlertType) {
        return TYPES.indexOf(value) !== -1;
      },
    },
    message: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    show: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-alert': true,
        [`oxd-alert--${this.type}`]: true,
      };
    },
    contentClasses(): object {
      return {
        'oxd-alert-content': true,
        [`oxd-alert-content--${this.type}`]: true,
      };
    },
    iconName(): string {
      return this.icon ? this.icon : ICON_MAP[this.type as AlertType];
    },
  },
});
</script>

<style src="./alert.scss" lang="scss" scoped></style>
