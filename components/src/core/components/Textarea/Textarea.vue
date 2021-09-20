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
  <textarea
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
import {
  TextareaResize,
  RESIZE_NONE,
  RESIZE_VERTICAL,
  RESIZE_HORIZONTAL,
} from './types';

export interface State {
  focused: boolean;
}

export default defineComponent({
  name: 'oxd-textarea',

  props: {
    modelValue: {},
    resize: {
      type: String,
      default: RESIZE_VERTICAL,
      validator: function(value: TextareaResize) {
        return (
          [RESIZE_VERTICAL, RESIZE_HORIZONTAL, RESIZE_NONE].indexOf(value) !==
          -1
        );
      },
    },
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },

  data: (): State => {
    return {
      focused: false,
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-textarea': true,
        'oxd-textarea--active': !this.focused,
        'oxd-textarea--focus': this.focused,
        'oxd-textarea--error': this.hasError,
        [`oxd-textarea--resize-${this.resize}`]: true,
      };
    },
  },

  methods: {
    onFocus(e: Event) {
      this.focused = true;
      this.$emit('focus', e);
    },
    onBlur(e: Event) {
      this.focused = false;
      this.$emit('blur', e);
    },
    onInput(e: Event) {
      e.preventDefault();
      this.$emit('update:modelValue', (e.target as HTMLTextAreaElement).value);
      this.$emit('input', e);
    },
  },
});
</script>

<style src="./textarea.scss" lang="scss" scoped></style>
