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
  <div class="oxd-switch-wrapper">
    <label :class="{'--disabled': disabled}">
      <template v-if="labelPosition === 'left'">
        {{ optionLabel }}
      </template>
      <input
        v-bind="$attrs"
        v-model="checked"
        type="checkbox"
        :disabled="disabled"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
      />
      <span :class="classes" :style="style"> </span>
      <template v-if="labelPosition === 'right'">
        {{ optionLabel }}
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Position, LABEL_POSITIONS, RIGHT} from './types';

export interface State {
  focused: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedProxy: any;
}

export default defineComponent({
  name: 'OxdSwitchInput',
  inheritAttrs: false,
  props: {
    modelValue: {},
    style: {
      type: Object,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    optionLabel: {
      type: String,
      default: '',
    },
    labelPosition: {
      type: String,
      default: RIGHT,
      validator: function (value: Position) {
        return LABEL_POSITIONS.indexOf(value) !== -1;
      },
    },
  },

  emits: ['update:modelValue', 'blur', 'focus', 'change'],

  data(): State {
    return {
      focused: false,
      checkedProxy: {},
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-switch-input': true,
        'oxd-switch-input--active': !this.focused,
        'oxd-switch-input--focus': this.focused,
        'oxd-switch-input--error': this.hasError,
        [`--label-${this.labelPosition}`]: true,
      };
    },
    checked: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.checkedProxy = value;
      },
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
    onChange(e: Event) {
      this.$emit('update:modelValue', this.checkedProxy);
      this.$emit('change', e);
    },
  },
});
</script>

<style src="./switch-input.scss" lang="scss" scoped></style>
