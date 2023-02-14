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
  <div class="oxd-autocomplete-wrapper">
    <oxd-autocomplete-text-input
      v-bind="$attrs"
      :clear="showClear"
      :placeholder="placeholderText"
      :value="inputValue"
      :disabled="disabled"
      :readonly="readonly"
      @blur="onBlur"
      @input="onSearch"
      @clear="onClear"
      @keyup.esc="onCloseDropdown"
      @keydown.enter.prevent="onSelectEnter"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
    >
      <template #beforeInput>
        <slot
          v-if="!multiple && modelValue"
          name="beforeSelected"
          :data="modelValue"
        ></slot>
      </template>
      <template #afterInput>
        <slot
          v-if="!multiple && modelValue"
          name="afterSelected"
          :data="modelValue"
        ></slot>
      </template>
    </oxd-autocomplete-text-input>

    <oxd-autocomplete-dropdown
      v-if="dropdownOpen"
      :class="dropdownClasses"
      :loading="loading"
      :empty="computedOptions.length === 0"
    >
      <oxd-autocomplete-option
        v-for="(option, i) in computedOptions"
        :key="option.id"
        :class="optionClasses[i]"
        :disabled="option._disabled || option._selected"
        @select="onSelect(option)"
      >
        <slot name="option" :data="option" :text="highlightedOptions[i]"></slot>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-if="!$slots['option']" v-html="highlightedOptions[i]"></span>
      </oxd-autocomplete-option>
    </oxd-autocomplete-dropdown>

    <oxd-autocomplete-chips
      v-if="multiple"
      :disabled="disabled"
      :readonly="readonly"
      :selected="modelValue"
      @chip-removed="onRemoveSelected"
    ></oxd-autocomplete-chips>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import debounce from '@/utils/debounce';
import usei18n from '@/composables/usei18n';
import type {Option, Position} from '../types';
import eventsMixin from '../Select/events-mixin';
import {TOP, BOTTOM, DROPDOWN_POSITIONS} from '../types';
import navigationMixin from '../Select/navigation-mixin';
import AutocompleteChips from '@/components/Input/Autocomplete/AutocompleteChips.vue';
import AutocompleteOption from '@/components/Input/Autocomplete/AutocompleteOption.vue';
import AutocompleteDropdown from '@/components/Input/Autocomplete/AutocompleteDropdown.vue';
import AutocompleteTextInput from '@/components/Input/Autocomplete/AutocompleteTextInput.vue';

export default defineComponent({
  name: 'OxdAutocompleteInput',

  components: {
    'oxd-autocomplete-chips': AutocompleteChips,
    'oxd-autocomplete-option': AutocompleteOption,
    'oxd-autocomplete-dropdown': AutocompleteDropdown,
    'oxd-autocomplete-text-input': AutocompleteTextInput,
  },

  mixins: [navigationMixin, eventsMixin],

  inheritAttrs: false,

  props: {
    modelValue: {
      type: [Object, Array],
      required: false,
      default: () => null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    clear: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: null,
    },
    createOptions: {
      type: Function,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    dropdownPosition: {
      type: String,
      default: BOTTOM,
      validator: function (value: Position) {
        return DROPDOWN_POSITIONS.indexOf(value) !== -1;
      },
    },
  },

  emits: [
    'update:modelValue',
    'dropdown:clear',
    'dropdown:opened',
    'dropdown:closed',
    'dropdown:blur',
  ],

  setup() {
    return {
      ...usei18n(),
    };
  },

  data() {
    return {
      options: [],
      focused: false,
      loading: false,
      dropdownOpen: false,
      searchTerm: null as string | null,
    };
  },

  computed: {
    computedOptions(): Option[] {
      return this.options.map((option: Option) => {
        let _selected = false;
        if (Array.isArray(this.modelValue)) {
          _selected = this.modelValue.findIndex((o) => o.id === option.id) > -1;
        } else if (this.modelValue?.id === option.id) {
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
        };
      });
    },
    highlightedOptions(): string[] {
      const filter = new RegExp(this.searchTerm || '', 'i');
      return this.computedOptions.map((option: Option) => {
        return option.label.replace(filter, (match) => {
          return `<b>${match}</b>`;
        });
      });
    },
    selectedItem(): string | null {
      if (!this.multiple && this.modelValue?.label) {
        return this.modelValue.label;
      }
      return null;
    },
    inputValue(): string | null {
      if (this.computedOptions[this.pointer]?.label) {
        return this.computedOptions[this.pointer].label;
      } else if (this.searchTerm !== null) {
        return this.searchTerm;
      } else if (typeof this.modelValue === 'string') {
        return this.modelValue;
      } else if (!this.dropdownOpen) {
        return this.selectedItem;
      }
      return '';
    },
    showClear(): boolean {
      return (
        !this.disabled &&
        !this.readonly &&
        this.clear &&
        this.selectedItem !== null
      );
    },
    placeholderText(): string {
      return (
        this.placeholder ??
        this.t('general.type_for_hints', 'Type for hints...')
      );
    },
  },

  watch: {
    modelValue(value) {
      if (value === null || (Array.isArray(value) && value.length === 0)) {
        this.searchTerm = null;
      }
    },
  },

  methods: {
    onSearch($event: Event) {
      const searchTerm = ($event.target as HTMLInputElement).value;
      if (searchTerm) {
        this.loading = true;
        this.dropdownOpen = true;
        this.search(this, searchTerm);
      } else {
        this.loading = false;
        this.dropdownOpen = false;
      }
      this.searchTerm = searchTerm;
    },
    onSelect(option: Option) {
      this.pointer = -1;
      this.searchTerm = null;
      this.dropdownOpen = false;
      if (this.multiple) {
        const selected = Array.isArray(this.modelValue) ? this.modelValue : [];
        this.$emit('update:modelValue', [...selected, option]);
      } else {
        this.$emit('update:modelValue', option);
      }
    },
    search: debounce((vm, searchTerm: string) => {
      new Promise((resolve) => {
        if (vm.createOptions) {
          resolve(vm.createOptions(searchTerm));
        } else {
          throw new Error('createOptions not defined');
        }
      })
        .then((resolved) => {
          if (resolved && Array.isArray(resolved)) {
            if (resolved.length > 0) {
              vm.options = resolved.slice(0, 5);
            } else {
              vm.options = [];
            }
          } else {
            throw new Error('options returned are not array');
          }
        })
        .finally(() => {
          vm.loading = false;
        });
    }, 800),
    onBlur() {
      this.pointer = -1;
      this.dropdownOpen = false;
      this.$emit('dropdown:blur');
      if (
        this.searchTerm !== null &&
        (this.multiple === false || !Array.isArray(this.modelValue))
      ) {
        this.$emit('update:modelValue', this.searchTerm || null);
      }
    },
  },
});
</script>

<style src="./autocomplete-input.scss" lang="scss" scoped></style>
