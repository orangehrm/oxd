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
  <input
    :class="classes"
    :style="style"
    :value="modelValue"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export interface State {
  focused: boolean;
}

export default defineComponent({
  name: 'oxd-input',

  props: {
    // https://v3.vuejs.org/guide/migration/v-model.html#overview
    modelValue: {},
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },

  data(): State {
    return {
      focused: false,
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-input': true,
        'oxd-input--active': !this.focused,
        'oxd-input--focus': this.focused,
        'oxd-input--error': this.hasError,
      };
    },
  },

  methods: {
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    onInput(e: Event) {
      e.preventDefault();
      this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
      this.$emit('input', e);
    },
  },
});
</script>

<style src="./input.scss" lang="scss" scoped></style>
