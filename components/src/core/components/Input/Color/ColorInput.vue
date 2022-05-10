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
  <div :class="classes" :tabindex="tabIndex" @focus="onFocus" @blur="onBlur">
    <div class="oxd-color-input-preview" :style="previewStyles"></div>
    <oxd-color-picker v-model="color"></oxd-color-picker>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, toRefs} from 'vue';
import ColorPicker from '@ohrm/oxd/core/components/Input/Color/ColorPicker.vue';

export default defineComponent({
  name: 'oxd-color-input',
  props: {
    modelValue: {
      type: String,
      default: null,
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

  emits: ['update:modelValue', 'blur', 'focus', 'change'],

  components: {
    'oxd-color-picker': ColorPicker,
  },

  setup(props) {
    const state = reactive({
      color: '#000',
      focused: false,
    });
    const previewStyles = computed(() => ({
      backgroundColor: props.modelValue ?? state.color,
      opacity: props.disabled || props.readonly ? 0.5 : 1,
      cursor: props.disabled || props.readonly ? 'unset' : 'pointer',
    }));

    const classes = computed(() => ({
      'oxd-color-input': true,
      'oxd-color-input--active': !state.focused,
      'oxd-color-input--focus': state.focused,
      'oxd-color-input--error': props.hasError,
      'oxd-color-input--disabled': props.disabled,
      'oxd-color-input--readonly': props.readonly,
    }));

    const tabIndex = computed(() => {
      return props.disabled || props.readonly ? -1 : 0;
    });

    const onFocus = ($e: Event) => {
      if (props.disabled || props.readonly) {
        $e.stopImmediatePropagation();
        return;
      }
      state.focused = true;
    };

    const onBlur = () => {
      state.focused = false;
    };

    return {
      tabIndex,
      classes,
      previewStyles,
      onBlur,
      onFocus,
      ...toRefs(state),
    };
  },
});
</script>

<style src="./color-input.scss" lang="scss" scoped></style>
