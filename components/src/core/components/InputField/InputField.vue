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
    :labelIcon="labelIcon"
    :message="message"
    class="oxd-input-field-bottom-space"
    :classes="classes"
  >
    <component
      :is="component"
      v-bind="$attrs"
      :hasError="hasError"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </component>
  </oxd-input-group>
</template>

<script lang="ts">
import {toRef, PropType, nextTick, defineComponent} from 'vue';
import InputGroup from '@ohrm/oxd/core/components/InputField/InputGroup.vue';
import Input from '@ohrm/oxd/core/components/Input/Input.vue';
import FileInput from '@ohrm/oxd/core/components/Input/FileInput.vue';
import Textarea from '@ohrm/oxd/core/components/Textarea/Textarea.vue';
import DropdownInput from '@ohrm/oxd/core/components/Input/DropdownInput.vue';
import PasswordInput from '@ohrm/oxd/core/components/Input/PasswordInput.vue';
import CheckboxInput from '@ohrm/oxd/core/components/Input/CheckboxInput.vue';
import SwitchInput from '@ohrm/oxd/core/components/Input/SwitchInput.vue';
import RadioInput from '@ohrm/oxd/core/components/Input/RadioInput.vue';
import DateInput from '@ohrm/oxd/core/components/Input/DateInput.vue';
import AutocompleteInput from '@ohrm/oxd/core/components/Input/Autocomplete/AutocompleteInput.vue';
import SelectInput from '@ohrm/oxd/core/components/Input/Select/SelectInput.vue';
import MultiSelectInput from '@ohrm/oxd/core/components/Input/MultiSelect/MultiSelectInput.vue';
import TimeInput from '@ohrm/oxd/core/components/Input/Time/TimeInput.vue';
import ColorInput from '@ohrm/oxd/core/components/Input/Color/ColorInput.vue';
import {Types, Components, TYPES, TYPE_INPUT, TYPE_MAP} from './types';
import useField from '../../../composables/useField';

export default defineComponent({
  name: 'oxd-input-field',
  inheritAttrs: false,

  components: {
    'oxd-input-group': InputGroup,
    'oxd-input': Input,
    'oxd-file-input': FileInput,
    'oxd-textarea': Textarea,
    'oxd-dropdown-input': DropdownInput,
    'oxd-password-input': PasswordInput,
    'oxd-checkbox-input': CheckboxInput,
    'oxd-switch-input': SwitchInput,
    'oxd-radio-input': RadioInput,
    'oxd-date-input': DateInput,
    'oxd-autocomplete-input': AutocompleteInput,
    'oxd-select-input': SelectInput,
    'oxd-multiselect-input': MultiSelectInput,
    'oxd-time-input': TimeInput,
    'oxd-color-input': ColorInput,
  },

  emits: ['update:modelValue'],

  props: {
    modelValue: {},
    label: {
      type: String,
    },
    labelIcon: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: TYPE_INPUT,
      validator: (value: Types) => {
        return TYPES.indexOf(value) !== -1;
      },
    },
    errors: {
      type: String,
      default: TYPE_INPUT,
      validator: (value: Types) => {
        return TYPES.indexOf(value) !== -1;
      },
    },
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Array as PropType<any>,
      default: () => [],
    },
  },

  setup(props, context) {
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
