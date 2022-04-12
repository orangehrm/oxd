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
  <div class="oxd-progressbar">
    <div class="oxd-progressbar-wrapper">
      <div :style="styles" :class="classes"></div>
    </div>
    <oxd-text v-if="showLabel" class="oxd-progressbar-text" tag="p">
      {{ progressText }}
    </oxd-text>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {ProgressbarType, TYPE_DEFAULT, TYPES} from './types';
import Text from '@ohrm/oxd/core/components/Text/Text.vue';

export default defineComponent({
  name: 'oxd-progressbar',
  props: {
    showLabel: {
      type: Boolean,
      default: true,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    animation: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 0,
      validator: function(value: number) {
        return value >= 0 && value <= 100;
      },
    },
    type: {
      type: String,
      default: TYPE_DEFAULT,
      validator: function(value: ProgressbarType) {
        return TYPES.indexOf(value) !== -1;
      },
    },
  },
  components: {
    'oxd-text': Text,
  },
  computed: {
    styles(): object {
      return {
        width: `${this.progress}%`,
      };
    },
    classes(): object {
      return {
        'oxd-progressbar-ticker': true,
        [`oxd-progressbar-ticker--${this.type}`]: true,
        '--striped': this.stripe,
        '--animated': this.animation,
      };
    },
    progressText(): string {
      return `${Math.round(this.progress)}%`;
    },
  },
});
</script>

<style src="./progressbar.scss" lang="scss" scoped></style>
