<template>
  <div class="oxd-autocomplete-wrapper">
    <oxd-autocomplete-text-input
      v-bind="$attrs"
      :clear="showClear"
      :placeholder="placeholder"
      :value="inputValue"
      @blur="onBlur"
      @input="onSearch"
      @clear="onClear"
      @keyup.esc="onCloseDropdown"
      @keydown.enter.prevent="onSelectEnter"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
    >
      <template v-slot:beforeInput>
        <slot
          v-if="!multiple && modelValue"
          name="beforeSelected"
          :data="modelValue"
        ></slot>
      </template>
      <template v-slot:afterInput>
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
      :empty="options.length === 0"
    >
      <oxd-autocomplete-option
        v-for="(option, i) in options"
        :key="option.id"
        :class="optionClasses[i]"
        :disabled="option._disabled || option._selected"
        @select="onSelect(option)"
      >
        <slot name="option" :data="option" :text="highlightedOptions[i]"></slot>
        <span v-if="!$slots['option']" v-html="highlightedOptions[i]"></span>
      </oxd-autocomplete-option>
    </oxd-autocomplete-dropdown>

    <oxd-autocomplete-chips
      v-if="multiple"
      :disabled="disabled"
      :selected="modelValue"
      @chipRemoved="onRemoveSelected"
    ></oxd-autocomplete-chips>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import debounce from '../../../../utils/debounce';
import eventsMixin from './events-mixin';
import navigationMixin from './navigation-mixin';
import {TOP, BOTTOM, Option, Position, DROPDOWN_POSITIONS} from '../types';
import AutocompleteTextInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteTextInput.vue';
import AutocompleteDropdown from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteDropdown.vue';
import AutocompleteOption from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteOption.vue';
import AutocompleteChips from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteChips.vue';

export default defineComponent({
  name: 'oxd-autocomplete-input',
  inheritAttrs: false,

  components: {
    'oxd-autocomplete-text-input': AutocompleteTextInput,
    'oxd-autocomplete-dropdown': AutocompleteDropdown,
    'oxd-autocomplete-option': AutocompleteOption,
    'oxd-autocomplete-chips': AutocompleteChips,
  },

  mixins: [navigationMixin, eventsMixin],

  emits: [
    'update:modelValue',
    'dropdown:clear',
    'dropdown:opened',
    'dropdown:closed',
    'dropdown:blur',
  ],

  props: {
    modelValue: {},
    disabled: {
      type: Boolean,
      default: false,
    },
    clear: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'Type for hints...',
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
      options: [],
    };
  },

  computed: {
    dropdownClasses(): object {
      return {
        '--positon-bottom': this.dropdownPosition === BOTTOM,
        '--positon-top': this.dropdownPosition === TOP,
      };
    },
    optionClasses(): object[] {
      return this.options.map((option: Option, index: number) => {
        return {
          '--disabled': option._disabled,
          '--selected': option._selected,
          '--focused': index === this.pointer,
        };
      });
    },
    highlightedOptions(): string[] {
      const filter = new RegExp(this.searchTerm, 'i');
      return this.options.map((option: Option) => {
        return option.label.replace(filter, match => {
          return `<b>${match}</b>`;
        });
      });
    },
    selectedItem(): string {
      if (this.searchTerm) {
        return this.searchTerm;
      } else if (!this.multiple && this.modelValue?.label) {
        return this.modelValue.label;
      }
      return null;
    },
    inputValue(): string {
      return this.options[this.pointer]?.label || this.selectedItem;
    },
    showClear(): boolean {
      return !this.disabled && this.clear && this.selectedItem !== null;
    },
  },

  methods: {
    onSearch($event: Event) {
      const searchTerm = ($event.target as HTMLInputElement).value;
      if (searchTerm) {
        this.loading = true;
        this.dropdownOpen = true;
        this.searchTerm = searchTerm;
        this.search(this, searchTerm);
      }
      if (!this.multiple) {
        this.$emit('update:modelValue', null);
      }
    },
    search: debounce((vm, searchTerm: string) => {
      new Promise(resolve => {
        if (vm.createOptions) {
          resolve(vm.createOptions(searchTerm));
        } else {
          throw new Error('createOptions not defined');
        }
      })
        .then(resolved => {
          if (resolved && Array.isArray(resolved)) {
            if (resolved.length > 0) {
              vm.options = resolved.slice(0, 5).map((option: Option) => {
                let _selected = false;
                if (Array.isArray(vm.modelValue)) {
                  _selected =
                    vm.modelValue.findIndex(o => o.id === option.id) > -1;
                } else if (vm.modelValue?.id === option.id) {
                  _selected = true;
                }
                return {...option, _selected};
              });
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
  },
});
</script>

<style src="./autocomplete-input.scss" lang="scss" scoped></style>
