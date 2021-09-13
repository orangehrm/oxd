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
        @update:show="onUpdateShow($event, index, toast)"
        :class="toastClass"
        :style="{zIndex: toasts.length - index}"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {POSITION_BOTTOM, POSITIONS, ToastContainerPositions} from './types';
import Toast from '@orangehrm/oxd/core/components/Toast/Toast.vue';

export default defineComponent({
  name: 'oxd-toast-container',

  components: {
    'oxd-toast': Toast,
  },

  emits: ['update:toasts'],

  props: {
    toasts: {
      type: Array,
      default: () => [],
    },
    transition: {
      type: String,
      default: 'oxd-toast-fade',
    },
    toastClass: {
      type: String,
      default: 'oxd-toast-container--toast',
    },
    position: {
      type: String,
      default: POSITION_BOTTOM,
      validator: function(value: ToastContainerPositions) {
        return POSITIONS.indexOf(value) !== -1;
      },
    },
  },

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
