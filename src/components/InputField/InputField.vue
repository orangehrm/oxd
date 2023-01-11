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
  <oxd-input-group
    :label="label"
    :classes="classes"
    :label-icon="labelIcon"
    :message="message || ''"
    class="oxd-input-field-bottom-space"
  >
    <component
      :is="component"
      v-bind="$attrs"
      :disabled="disabled"
      :has-error="hasError"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </component>
  </oxd-input-group>
</template>

<script lang="ts">
import useField from '@/composables/useField';
import type {PropType} from 'vue';
import {toRef, nextTick, defineComponent} from 'vue';
import Input from '@/components/Input/Input.vue';
import type {Types, Components} from './types';
import {TYPES, TYPE_INPUT, TYPE_MAP} from './types';
import FileInput from '@/components/Input/FileInput.vue';
import DateInput from '@/components/Input/DateInput.vue';
import RadioInput from '@/components/Input/RadioInput.vue';
import SwitchInput from '@/components/Input/SwitchInput.vue';
import TimeInput from '@/components/Input/Time/TimeInput.vue';
import InputGroup from '@/components/InputField/InputGroup.vue';
import PasswordInput from '@/components/Input/PasswordInput.vue';
import CheckboxInput from '@/components/Input/CheckboxInput.vue';
import ColorInput from '@/components/Input/Color/ColorInput.vue';
import Textarea from '@/components/Input/Textarea/Textarea.vue';
import SelectInput from '@/components/Input/Select/SelectInput.vue';
import MultiSelectInput from '@/components/Input/MultiSelect/MultiSelectInput.vue';
import AutocompleteInput from '@/components/Input/Autocomplete/AutocompleteInput.vue';

export default defineComponent({
  name: 'OxdInputField',

  components: {
    'oxd-input': Input,
    'oxd-textarea': Textarea,
    'oxd-file-input': FileInput,
    'oxd-date-input': DateInput,
    'oxd-time-input': TimeInput,
    'oxd-input-group': InputGroup,
    'oxd-color-input': ColorInput,
    'oxd-radio-input': RadioInput,
    'oxd-select-input': SelectInput,
    'oxd-switch-input': SwitchInput,
    'oxd-password-input': PasswordInput,
    'oxd-checkbox-input': CheckboxInput,
    'oxd-multiselect-input': MultiSelectInput,
    'oxd-autocomplete-input': AutocompleteInput,
  },

  inheritAttrs: false,

  props: {
    modelValue: {
      type: null,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
    labelIcon: {
      type: String,
      required: false,
      default: null,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: TYPE_INPUT,
      validator: (value: Types) => {
        return TYPES.indexOf(value) !== -1;
      },
    },
    errors: {
      type: String,
      required: false,
      default: TYPE_INPUT,
      validator: (value: Types) => {
        return TYPES.indexOf(value) !== -1;
      },
    },
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Array as PropType<any>,
      required: false,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup(props, context) {
    const disabled = toRef(props, 'disabled');
    const modelValue = toRef(props, 'modelValue');
    const initialValue = modelValue.value;

    const onReset = async () => {
      context.emit('update:modelValue', initialValue);
      await nextTick();
    };

    const {hasError, message} = useField({
      fieldLabel: props.label ? props.label : '',
      rules: props.rules,
      modelValue,
      onReset,
      disabled,
    });

    return {
      message,
      hasError,
    };
  },

  computed: {
    classes(): object {
      return {
        label: {
          'oxd-input-field-required': this.required,
        },
        message: {
          'oxd-input-field-error-message': this.hasError,
        },
      };
    },
    component(): Components {
      return TYPE_MAP[this.type as Types];
    },
  },
});
</script>

<style src="./input-field.scss" lang="scss"></style>
