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
  <div :class="classes" :style="style">
    <div class="oxd-autocomplete-text-input--before">
      <slot name="beforeInput"></slot>
    </div>
    <input
      v-bind="$attrs"
      :disabled="disabled"
      :readonly="readonly"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div class="oxd-autocomplete-text-input--after">
      <slot name="afterInput"></slot>
      <oxd-icon
        v-if="clear"
        class="oxd-autocomplete-text-input--clear"
        name="x"
        @click="onClear"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@/components/Icon/Icon.vue';

export default defineComponent({
  name: 'OxdAutocompleteTextInput',

  components: {
    'oxd-icon': Icon,
  },

  inheritAttrs: false,

  props: {
    style: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    hasError: {
      type: Boolean,
      required: false,
      default: false,
    },
    clear: {
      type: Boolean,
      required: false,
      default: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: ['clear'],

  data() {
    return {
      focused: false,
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-autocomplete-text-input': true,
        'oxd-autocomplete-text-input--active': !this.focused,
        'oxd-autocomplete-text-input--focus': this.focused,
        'oxd-autocomplete-text-input--error': this.hasError,
        'oxd-autocomplete-text-input--disabled': this.disabled,
        'oxd-autocomplete-text-input--readonly': this.readonly,
      };
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
    onClear() {
      this.$emit('clear');
    },
  },
});
</script>

<style src="./autocomplete-input.scss" lang="scss" scoped></style>
