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
  <div class="oxd-multiselect-wrapper">
    <oxd-select-text
      v-bind="$attrs"
      :disabled="disabled"
      :readonly="readonly"
      @blur="onBlur"
      @focus="onOpenDropdown"
      @keyup.esc="onCloseDropdown"
      @keydown.enter.prevent="onSelectEnter"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
      @keydown="onKeypress"
    >
      <template v-slot:afterInput>
        <slot
          v-if="modelValue.length > 0"
          name="afterSelected"
          :data="modelValue"
        ></slot>
      </template>
    </oxd-select-text>

    <oxd-select-dropdown
      v-if="dropdownOpen"
      :class="dropdownClasses"
      :loading="loading"
      :empty="computedOptions.length === 0"
      :empty-text="emptyText"
    >
      <oxd-select-option
        v-for="(option, i) in computedOptions"
        :key="option.id"
        :class="optionClasses[i]"
        :disabled="option._disabled || option._selected"
        :ref="`option-${i}`"
        @select="onSelect(option)"
      >
        <slot name="option" :data="option"></slot>
        <span v-if="!$slots['option']">{{ option.label }}</span>
      </oxd-select-option>
    </oxd-select-dropdown>

    <oxd-mutliselect-chips
      :disabled="disabled"
      :readonly="readonly"
      :selected="modelValue"
      @chipRemoved="onRemoveSelected"
    ></oxd-mutliselect-chips>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import eventsMixin from '../Select/events-mixin';
import navigationMixin from '../Select/navigation-mixin';
import {TOP, BOTTOM, Option, Position, DROPDOWN_POSITIONS} from '../types';
import SelectText from '@ohrm/oxd/core/components/Input/Select/SelectText.vue';
import SelectDropdown from '@ohrm/oxd/core/components/Input/Select/SelectDropdown.vue';
import SelectOption from '@ohrm/oxd/core/components/Input/Select/SelectOption.vue';
import MultiSelectChips from '@ohrm/oxd/core/components/Input/MultiSelect/MultiSelectChips.vue';

export default defineComponent({
  name: 'oxd-multiselect-input',
  inheritAttrs: false,

  components: {
    'oxd-select-text': SelectText,
    'oxd-select-dropdown': SelectDropdown,
    'oxd-select-option': SelectOption,
    'oxd-mutliselect-chips': MultiSelectChips,
  },

  mixins: [navigationMixin, eventsMixin],

  emits: [
    'update:modelValue',
    'dropdown:opened',
    'dropdown:closed',
    'dropdown:blur',
    'dropdown:clear',
  ],

  props: {
    modelValue: {
      type: Array,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
    emptyText: {
      type: String,
      required: false,
    },
    dropdownPosition: {
      type: String,
      default: BOTTOM,
      validator: function(value: Position) {
        return DROPDOWN_POSITIONS.indexOf(value) !== -1;
      },
    },
  },

  data() {
    return {
      focused: false,
      loading: false,
      dropdownOpen: false,
      searchTerm: null,
    };
  },

  computed: {
    computedOptions(): Option[] {
      return this.options.map((option: Option) => {
        let _selected = false;
        if (Array.isArray(this.modelValue)) {
          _selected = this.modelValue.findIndex(o => o.id === option.id) > -1;
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
  },

  watch: {
    pointer(newIndex: number) {
      const option = this.$refs[`option-${newIndex}`];
      if (option?.$el) this.scrollToView(option.$el);
    },
  },
});
</script>

<style src="./multiselect-input.scss" lang="scss" scoped></style>
