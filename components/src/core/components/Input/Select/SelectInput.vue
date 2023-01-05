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
  <div class="oxd-select-wrapper">
    <oxd-select-text
      v-bind="$attrs"
      :value="inputValue"
      :disabled="disabled"
      @blur="onBlur"
      @focus="onOpenDropdown"
      @keyup.esc="onCloseDropdown"
      @keydown.enter.prevent="onSelectEnter"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
      @keydown="onKeypress"
    >
      <template #afterInput>
        <slot v-if="modelValue" name="afterSelected" :data="modelValue"></slot>
      </template>
    </oxd-select-text>

    <oxd-select-dropdown
      v-if="dropdownOpen"
      :class="dropdownClasses"
      :loading="loading"
      :empty="computedOptions.length === 0"
      :empty-text="emptyText"
    >
      <oxd-select-option v-if="showEmptySelector" @select="onClear">
        {{ placeholderText }}
      </oxd-select-option>
      <oxd-select-option
        v-for="(option, i) in computedOptions"
        :key="option.id"
        :ref="`option-${i}`"
        :class="optionClasses[i]"
        :disabled="option._disabled || option._selected"
        @select="onSelect(option)"
      >
        <slot name="option" :data="option"></slot>
        <span v-if="!$slots['option']">{{ option.label }}</span>
      </oxd-select-option>
    </oxd-select-dropdown>
  </div>
</template>

<script lang="ts">
import eventsMixin from './events-mixin';
import navigationMixin from './navigation-mixin';
import usei18n from '../../../../composables/usei18n';
import {ComponentPublicInstance, defineComponent, PropType} from 'vue';
import {TOP, BOTTOM, Option, Position, DROPDOWN_POSITIONS} from '../types';
import SelectText from '@ohrm/oxd/core/components/Input/Select/SelectText.vue';
import SelectOption from '@ohrm/oxd/core/components/Input/Select/SelectOption.vue';
import SelectDropdown from '@ohrm/oxd/core/components/Input/Select/SelectDropdown.vue';

export default defineComponent({
  name: 'OxdSelectInput',

  components: {
    'oxd-select-text': SelectText,
    'oxd-select-dropdown': SelectDropdown,
    'oxd-select-option': SelectOption,
  },

  mixins: [navigationMixin, eventsMixin],

  inheritAttrs: false,

  props: {
    modelValue: {
      type: Object,
      required: false,
      default: () => null,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    options: {
      type: Array as PropType<Option[]>,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    showEmptySelector: {
      type: Boolean,
      required: false,
      default: true,
    },
    emptyText: {
      type: String,
      required: false,
      default: null,
    },
    dropdownPosition: {
      type: String,
      required: false,
      default: BOTTOM,
      validator: function (value: Position) {
        return DROPDOWN_POSITIONS.indexOf(value) !== -1;
      },
    },
  },

  emits: [
    'dropdown:blur',
    'dropdown:clear',
    'dropdown:opened',
    'dropdown:closed',
    'update:modelValue',
  ],

  setup() {
    return {
      ...usei18n(),
    };
  },

  data() {
    return {
      focused: false,
      loading: false,
      searchTerm: null,
      dropdownOpen: false,
    };
  },

  computed: {
    computedOptions(): Option[] {
      return this.options.map((option: Option) => {
        let _selected = false;
        if (this.modelValue?.id === option.id) {
          _selected = true;
        }
        return {...option, _selected};
      });
    },
    dropdownClasses(): object {
      return {
        '--positon-bottom': this.dropdownPosition === BOTTOM,
        '--positon-top': this.dropdownPosition === TOP,
      };
    },
    optionClasses(): object[] {
      return this.computedOptions.map((option: Option, index: number) => {
        return {
          '--disabled': option._disabled,
          '--selected': option._selected,
          '--focused': index === this.pointer,
          [`--indent-${option._indent}`]: option._indent !== undefined,
        };
      });
    },
    selectedItem(): string {
      return this.modelValue?.label
        ? this.modelValue.label
        : this.placeholderText;
    },
    inputValue(): string {
      return this.computedOptions[this.pointer]?.label || this.selectedItem;
    },
    placeholderText(): string {
      return this.placeholder ?? this.t('general.select', '-- Select --');
    },
  },

  watch: {
    pointer(newIndex: number) {
      const option = this.$refs[
        `option-${newIndex}`
      ] as ComponentPublicInstance;
      if (option?.$el) this.scrollToView(option.$el);
    },
  },
});
</script>

<style src="./select-input.scss" lang="scss" scoped></style>
