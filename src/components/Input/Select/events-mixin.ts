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

import type {Option} from '../types';
import {defineComponent} from 'vue';

export const eventsMixin = defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['modelValue', 'disabled'],

  emits: [
    'dropdown:blur',
    'dropdown:clear',
    'dropdown:opened',
    'dropdown:closed',
    'update:modelValue',
  ],

  data(): {
    pointer: number;
    dropdownOpen: boolean;
  } {
    return {
      dropdownOpen: false,
      pointer: -1,
    };
  },

  methods: {
    onOpenDropdown() {
      if (this.disabled || this.dropdownOpen) return;
      this.dropdownOpen = true;
      this.$emit('dropdown:opened');
    },
    onCloseDropdown() {
      if (this.disabled || !this.dropdownOpen) return;
      this.dropdownOpen = false;
      this.$emit('dropdown:closed');
    },
    onBlur() {
      this.onCloseDropdown();
      this.$emit('dropdown:blur');
    },
    onSelect(option: Option) {
      this.pointer = -1;
      this.dropdownOpen = false;
      if (Array.isArray(this.modelValue)) {
        this.$emit('update:modelValue', [...this.modelValue, option]);
      } else {
        this.$emit('update:modelValue', option);
      }
    },
    onRemoveSelected(option: Option) {
      const filteredOptions = this.modelValue.filter(
        (item: Option) => item.id !== option.id,
      );
      this.$emit('update:modelValue', filteredOptions);
    },
    onClear() {
      this.$emit('update:modelValue', null);
      this.$emit('dropdown:clear');
    },
  },
});

export default eventsMixin;
