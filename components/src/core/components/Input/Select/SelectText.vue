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
  <div @click="onToggle" :class="classes" :style="style">
    <div
      class="oxd-select-text-input"
      :tabindex="tabIndex"
      @focus="onFocus"
      @blur="onBlur"
      v-bind="$attrs"
      ref="oxdInput"
    >
      {{ value }}
    </div>
    <div class="oxd-select-text--after">
      <slot name="afterInput"></slot>
      <oxd-icon
        v-if="!disabled"
        :class="dropdownIconClasses"
        :name="dropdownIcon"
        @click="onToggle"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@ohrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'oxd-select-text',
  inheritAttrs: false,

  components: {
    'oxd-icon': Icon,
  },

  props: {
    value: {
      type: String,
    },
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      focused: false,
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-select-text': true,
        'oxd-select-text--active': !this.focused,
        'oxd-select-text--focus': this.focused,
        'oxd-select-text--error': this.hasError,
        'oxd-select-text--disabled': this.disabled,
        'oxd-select-text--readonly': this.readonly,
      };
    },
    dropdownIcon(): string {
      return this.focused ? 'caret-up-fill' : 'caret-down-fill';
    },
    dropdownIconClasses(): object {
      return {
        'oxd-select-text--arrow': true,
        '--disabled': this.disabled,
        '--readonly': this.readonly,
      };
    },
    tabIndex(): number {
      return this.disabled || this.readonly ? -1 : 0;
    },
  },

  methods: {
    onFocus($e: Event) {
      if (this.disabled || this.readonly) {
        $e.stopImmediatePropagation();
        return;
      }
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    onToggle() {
      this.$refs.oxdInput.focus();
    },
  },
});
</script>

<style src="./select-input.scss" lang="scss" scoped></style>
