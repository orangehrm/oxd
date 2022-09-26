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
    <textarea
      class="oxd-buzz-post-input"
      :disabled="disabled"
      :value="modelValue"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      v-bind="$attrs"
    />
    <div class="oxd-buzz-post-slot">
      <slot></slot>
    </div>
  </div>
  <oxd-text v-if="hasError" tag="span" class="oxd-input-field-error-message">
    {{ message }}
  </oxd-text>
</template>

<script lang="ts">
import {Rule} from '../../../composables/types';
import useField from '../../../composables/useField';
import Text from '@ohrm/oxd/core/components/Text/Text.vue';
import {defineComponent, toRef, nextTick, PropType, computed, ref} from 'vue';

export default defineComponent({
  name: 'oxd-buzz-post-input',
  inheritAttrs: false,
  components: {
    'oxd-text': Text,
  },
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array as PropType<Rule[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const focused = ref(false);
    const disabled = toRef(props, 'disabled');
    const modelValue = toRef(props, 'modelValue');

    const initialValue = modelValue.value;

    const onReset = async () => {
      context.emit('update:modelValue', initialValue);
      await nextTick();
    };

    const {hasError, message} = useField({
      fieldLabel: '',
      rules: props.rules,
      modelValue,
      onReset,
      disabled,
    });

    const classes = computed(() => ({
      'oxd-buzz-post': true,
      'oxd-buzz-post--focus': focused.value,
      'oxd-buzz-post--error': hasError.value,
      'oxd-buzz-post--active': !focused.value,
      'oxd-buzz-post--disabled': disabled.value,
      'oxd-buzz-post--composing': modelValue.value,
    }));

    const onFocus = () => {
      focused.value = true;
    };

    const onBlur = () => {
      focused.value = false;
    };

    const onInput = ($e: Event) => {
      context.emit(
        'update:modelValue',
        ($e.target as HTMLTextAreaElement).value,
      );
    };

    return {
      onBlur,
      classes,
      message,
      onFocus,
      onInput,
      hasError,
    };
  },
});
</script>

<style src="./buzz-post-input.scss" lang="scss" scoped></style>
