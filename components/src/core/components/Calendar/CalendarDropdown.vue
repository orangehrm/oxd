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
  <li
    @click="openSubmenu"
    v-click-outside="closeSubMenu"
    :class="{'--active': isActive}"
  >
    <slot></slot>

    <transition name="transition-fade-down">
      <ul
        @click.stop="closeSubMenu"
        v-if="isActive"
        class="oxd-calendar-dropdown"
        role="menu"
      >
        <li
          v-for="(option, index) in options"
          :ref="`oxd-cal-ref-${index}`"
          :class="{
            'oxd-calendar-dropdown--option': true,
            '--selected': index === selected,
          }"
          :key="`oxd-cal-option-${index}`"
          @click="onSelectOption(index)"
        >
          {{ option }}
        </li>
      </ul>
    </transition>
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import clickOutsideDirective from '../../../directives/click-outside';

export default defineComponent({
  name: 'oxd-calendar-dropdown',
  emits: ['select'],

  props: {
    options: {
      type: Array,
      required: true,
    },
    selected: {
      type: Number,
      required: false,
    },
  },

  data() {
    return {
      isActive: false,
    };
  },

  directives: {
    'click-outside': clickOutsideDirective,
  },

  methods: {
    openSubmenu() {
      this.isActive = true;
      this.$nextTick(() => {
        const elm = this.$refs[`oxd-cal-ref-${this.selected}`];
        elm && this.scrollToView(elm);
      });
    },
    closeSubMenu() {
      if (this.isActive) {
        this.isActive = false;
      }
    },
    onSelectOption(option) {
      this.$emit('select', option);
    },
    scrollToView(elm: HTMLElement) {
      elm.scrollIntoView();
    },
  },
});
</script>

<style src="./calendar-dropdown.scss" lang="scss" scoped></style>
