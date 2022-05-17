<template>
  <div class="oxd-autocomplete-wrapper">
    <oxd-autocomplete-text-input
      v-bind="$attrs"
      :clear="showClear"
      :placeholder="$t(placeholder)"
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
      :empty="computedOptions.length === 0"
      v-dropdown-direction
    >
      <oxd-autocomplete-option
        v-for="(option, i) in computedOptions"
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
      v-if="showChips"
      :disabled="disabled"
      :readonly="readonly"
      :selected="showChips ? modelValue : []"
      @chipRemoved="onRemoveSelected"
    ></oxd-autocomplete-chips>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import debounce from 'lodash.debounce';
import eventsMixin from '../Select/events-mixin';
import navigationMixin from '../Select/navigation-mixin';
import {TOP, BOTTOM, Option, Position, DROPDOWN_POSITIONS} from '../types';
import AutocompleteTextInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteTextInput.vue';
import AutocompleteDropdown from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteDropdown.vue';
import AutocompleteOption from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteOption.vue';
import AutocompleteChips from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteChips.vue';
import useSanitize from '../../../../composables/useSanitize';
import dropdownDirectionDirective from '../../../../directives/dropdown-direction';
import translateMixin from '../../../../mixins/translate';

export default defineComponent({
  name: 'oxd-autocomplete-input',
  inheritAttrs: false,

  components: {
    'oxd-autocomplete-text-input': AutocompleteTextInput,
    'oxd-autocomplete-dropdown': AutocompleteDropdown,
    'oxd-autocomplete-option': AutocompleteOption,
    'oxd-autocomplete-chips': AutocompleteChips,
  },

  directives: {
    'dropdown-direction': dropdownDirectionDirective,
  },

  mixins: [navigationMixin, eventsMixin, translateMixin],

  emits: [
    'update:modelValue',
    'dropdown:clear',
    'dropdown:opened',
    'dropdown:closed',
    'dropdown:blur',
    'select:enter',
  ],

  props: {
    modelValue: {},
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
      debouncer: null,
      selectedValues: null,
    };
  },

  computed: {
    showChips(): boolean {
      return Array.isArray(this.modelValue || []) && this.multiple;
    },
    computedOptions(): Option[] {
      return this.options
        .map((option: Option) => {
          let _selected = false;
          if (Array.isArray(this.modelValue)) {
            _selected = this.modelValue.findIndex(o => o.id === option.id) > -1;
          } else if (this.modelValue?.id === option.id) {
            _selected = true;
          }
          return {...option, _selected};
        })
        .filter((option: Option) => !option._selected);
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
      const searchValue = this.searchTerm.replace(
        /[-/\\^$*+?.()|[\]{}]/g,
        '\\$&',
      );
      const sanitizeHtml = useSanitize().sanitizeHtml;
      return this.computedOptions.map((option: Option) => {
        var textParts = option.label.split(searchValue);
        var sanitizedTextParts = [];
        for (var i = 0; i < textParts.length; i++) {
          sanitizedTextParts[i] = sanitizeHtml(textParts[i]);
        }
        return sanitizedTextParts.join(`<b>${sanitizeHtml(searchValue)}</b>`);
      });
    },
    selectedItem(): string {
      return !this.multiple && this.modelValue?.label
        ? this.modelValue.label
        : null;
    },
    inputValue(): string {
      if (this.computedOptions[this.pointer]?.label) {
        return this.computedOptions[this.pointer].label;
      } else if (this.searchTerm) {
        return this.searchTerm;
      } else if (!this.dropdownOpen) {
        return this.selectedItem;
      }
      return '';
    },
    showClear(): boolean {
      const a =
        !this.disabled &&
        !this.readonly &&
        this.clear &&
        this.selectedItem !== null;
      return a;
    },
  },

  methods: {
    onSearch($event: Event) {
      const searchTerm = ($event.target as HTMLInputElement).value;
      this.searchTerm = searchTerm;
      if (searchTerm) {
        this.loading = true;
        this.dropdownOpen = true;
        this.pointer = -1;
        this.search(searchTerm);
        this.$emit('update:searchTerm', searchTerm);
      } else {
        this.loading = false;
        this.dropdownOpen = false;
        this.pointer = -1;
        if (Array.isArray(this.modelValue) && this.modelValue.length > 0)
          return;
        if (typeof this.searchTerm === 'string')
          this.$emit('update:modelValue', null);
        this.searchTerm = null;
      }
    },
    onSelect(option: Option) {
      this.pointer = -1;
      this.dropdownOpen = false;
      this.searchTerm = null;
      if (this.multiple) {
        const selected = Array.isArray(this.modelValue) ? this.modelValue : [];
        this.$emit('update:modelValue', [...selected, option]);
      } else {
        this.$emit('update:modelValue', option);
      }
    },
    doSearch() {
      new Promise(resolve => {
        if (this.createOptions) {
          resolve(this.createOptions(this.searchTerm));
        } else {
          throw new Error('createOptions not defined');
        }
      }).then(resolved => {
        this.loading = false;
        if (resolved && Array.isArray(resolved)) {
          if (resolved.length > 0) {
            this.options = resolved.slice(0, 5);
          } else {
            this.options = [];
          }
        } else {
          throw new Error('options returned are not array');
        }
      });
    },
    search() {
      if (this.debouncer) {
        this.debouncer.cancel();
      }
      this.debouncer = debounce(this.doSearch, 300);
      this.debouncer();
    },
    onBlur() {
      this.dropdownOpen = false;
      this.pointer = -1;
      this.$emit('dropdown:blur');
      if (Array.isArray(this.modelValue) && this.modelValue.length > 0) return;
      if (typeof this.searchTerm === 'string' && this.searchTerm) {
        this.$emit('update:modelValue', this.searchTerm);
      }
    },
    onSelectEnter() {
      if (this.pointer >= 0) {
        const option = this.computedOptions[this.pointer];
        if (!option?._disabled) this.onSelect(option);
      } else {
        this.$emit('select:enter');
        if (this.multiple && this.modelValue.length === 0) {
          this.$emit('update:modelValue', this.searchTerm);
        } else if (!this.multiple) {
          this.$emit('update:modelValue', this.searchTerm);
        }
      }
      this.dropdownOpen = false;
    },
  },

  watch: {
    modelValue: {
      handler() {
        if (Array.isArray(this.modelValue) && this.modelValue.length === 0) {
          this.searchTerm = null;
        }
      },
    },
  },
});
</script>

<style src="./autocomplete-input.scss" lang="scss" scoped></style>
