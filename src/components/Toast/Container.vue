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
  <div :class="classes">
    <transition-group :name="transition">
      <oxd-toast
        v-for="(toast, index) in toasts"
        :key="toast"
        v-bind="toast"
        :class="toastClass"
        :style="{zIndex: toasts.length - index}"
        @update:show="onUpdateShow($event, index)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Toast from '@/components/Toast/Toast.vue';
import {POSITION_BOTTOM, POSITIONS} from './types';
import type {ToastContainerPositions} from './types';

export default defineComponent({
  name: 'OxdToastContainer',

  components: {
    'oxd-toast': Toast,
  },

  props: {
    toasts: {
      type: Array,
      required: false,
      default: () => [],
    },
    transition: {
      type: String,
      required: false,
      default: 'oxd-toast-fade',
    },
    toastClass: {
      type: String,
      required: false,
      default: 'oxd-toast-container--toast',
    },
    position: {
      type: String,
      required: false,
      default: POSITION_BOTTOM,
      validator: function (value: ToastContainerPositions) {
        return POSITIONS.indexOf(value) !== -1;
      },
    },
  },

  emits: ['update:toasts'],

  computed: {
    classes(): object {
      return {
        'oxd-toast-container': true,
        [`oxd-toast-container--${this.position}`]: true,
      };
    },
  },

  methods: {
    onUpdateShow(state: boolean, index: number) {
      if (state === false) {
        const toasts = [...this.toasts];
        toasts.splice(index, 1);
        this.$emit('update:toasts', toasts);
      }
    },
  },
});
</script>

<style src="./container.scss" lang="scss" scoped></style>
