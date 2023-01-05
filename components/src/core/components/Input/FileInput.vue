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
    ref="input"
    type="file"
    v-bind="$attrs"
    :class="fileInputClasses"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
  />
  <div :class="classes" :style="style" @click="onClick">
    <slot></slot>
    <template v-if="!$slots.default">
      <div
        v-if="buttonLabel"
        :class="{'oxd-file-button': true, '--disabled': disabled}"
      >
        {{ buttonLabel }}
      </div>
      <div class="oxd-file-input-div">
        {{ inputValue ? inputValue : placeholderText }}
      </div>
      <oxd-icon
        v-if="buttonIcon"
        :name="buttonIcon"
        :class="{'oxd-file-input-icon': true, '--disabled': disabled}"
      />
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {OutputFile} from './types';
import usei18n from '../../../composables/usei18n';
import Icon from '@ohrm/oxd/core/components/Icon/Icon.vue';

export interface State {
  focused: boolean;
  inputValue: string;
}

export default defineComponent({
  name: 'OxdFileInput',

  components: {
    'oxd-icon': Icon,
  },

  inheritAttrs: false,

  props: {
    modelValue: {
      type: Object,
      required: false,
      default: () => null,
    },
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
    buttonLabel: {
      type: String,
      required: false,
      default: null,
    },
    buttonIcon: {
      type: String,
      required: false,
      default: 'upload',
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
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

  emits: ['click', 'focus', 'blur', 'input', 'update:modelValue'],

  setup() {
    return {
      ...usei18n(),
    };
  },

  data(): State {
    return {
      focused: false,
      inputValue: '',
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-file-div': true,
        'oxd-file-div--active': !this.focused,
        'oxd-file-div--focus': this.focused,
        'oxd-file-div--error': this.hasError,
        'oxd-file-div--disabled': this.disabled,
        'oxd-file-div--readonly': this.readonly,
      };
    },
    fileInputClasses(): object {
      return {
        'oxd-file-input': true,
      };
    },
    placeholderText(): string {
      return (
        this.placeholder ?? this.t('general.no_file_chosen', 'No file chosen')
      );
    },
  },

  watch: {
    modelValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue !== undefined && newValue !== null) {
          this.inputValue = newValue.name;
        } else {
          this.inputValue = '';
        }
      }
    },
  },

  methods: {
    onClick(e: Event) {
      if (this.disabled || this.readonly) return;
      const inputRef = this.$refs.input as HTMLInputElement;
      inputRef.focus();
      inputRef.click();
      this.$emit('click', e);
    },
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
      const files = [...((e.target as HTMLInputElement).files || [])];
      const inputValue = files.map((file: File) => file.name).join(', ');

      if (files.length > 0) {
        // Not supporting with multiple (i.e. <input type="file" multiple>)
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (
            typeof event.target?.result === 'string' ||
            event.target?.result instanceof String
          ) {
            const base64 = event.target?.result.split(',').pop();
            if (base64) {
              const outputFile: OutputFile = {
                name: files[0].name,
                type: files[0].type,
                size: files[0].size,
                base64,
              };
              this.inputValue = inputValue;
              this.$emit('update:modelValue', outputFile);
            }
          }
        };
        reader.readAsDataURL(files[0]);
      } else {
        this.inputValue = inputValue;
        this.$emit('update:modelValue', null);
      }

      this.$emit('input', e);
    },
  },
});
</script>

<style src="./file-input.scss" lang="scss" scoped></style>
