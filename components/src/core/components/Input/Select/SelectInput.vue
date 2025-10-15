<template>
  <div class="oxd-select-wrapper">
    <oxd-select-text
      v-bind="$attrs"
      :value="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :dropdownOpened="dropdownOpen"
      @click="onToggleDropdown"
      @blur="onBlur"
      @keyup.esc="onCloseDropdown"
      @keydown.enter.prevent="onSelectEnter"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
      @keydown="onKeypress"
    >
      <template v-if="$slots.topOfInput" v-slot:topOfInput>
        <slot name="topOfInput"></slot>
      </template>
      <template v-slot:afterInput>
        <slot v-if="modelValue" name="afterSelected" :data="modelValue"></slot>
      </template>
    </oxd-select-text>

    <oxd-select-dropdown
      v-dropdown-direction="forceDropdownPosition === true"
      v-if="dropdownOpen"
      :class="dropdownClasses"
      :loading="isLoading"
      :empty="computedOptions.length === 0"
    >
      <oxd-select-option
        v-if="showEmptySelector && inputValue"
        @select="onClear"
      >
        {{ $vt('Unselect') }}
      </oxd-select-option>
      <oxd-select-option
        v-for="(option, i) in computedOptions"
        :key="option.id"
        :class="optionClasses[i]"
        :disabled="option._disabled || option._selected"
        :ref="`option-${i}`"
        @select="onSelect(option)"
      >
        <slot name="option" :data="option"></slot>
        <span v-if="!$slots['option']">{{
          translateOptions ? $vt(option.label) : option.label
        }}</span>
      </oxd-select-option>
    </oxd-select-dropdown>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import eventsMixin from './events-mixin';
import navigationMixin from './navigation-mixin';
import {TOP, BOTTOM, Option, Position, DROPDOWN_POSITIONS} from '../types';
import SelectText from '@orangehrm/oxd/core/components/Input/Select/SelectText.vue';
import SelectDropdown from '@orangehrm/oxd/core/components/Input/Select/SelectDropdown.vue';
import SelectOption from '@orangehrm/oxd/core/components/Input/Select/SelectOption.vue';
import translateMixin from '../../../../mixins/translate';
import dropdownDirectionDirective from '../../../../directives/dropdown-direction';

export default defineComponent({
  name: 'oxd-select-input',
  inheritAttrs: false,

  components: {
    'oxd-select-text': SelectText,
    'oxd-select-dropdown': SelectDropdown,
    'oxd-select-option': SelectOption,
  },

  directives: {
    'dropdown-direction': dropdownDirectionDirective,
  },

  mixins: [navigationMixin, eventsMixin, translateMixin],

  emits: [
    'update:modelValue',
    'dropdown:opened',
    'dropdown:closed',
    'dropdown:blur',
    'dropdown:clear',
  ],

  props: {
    modelValue: {
      type: Object,
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
    placeholder: {
      type: String,
      default: 'Select',
    },
    dropdownPosition: {
      type: String,
      default: BOTTOM,
      validator: function(value: Position) {
        return DROPDOWN_POSITIONS.indexOf(value) !== -1;
      },
    },
    showEmptySelector: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    translateOptions: {
      type: Boolean,
      default: true,
    },
    forceDropdownPosition: {
      type: Boolean,
      default: false,
    },
    scrollToOption: {
      type: Object,
      default: null,
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
        '--with-empty-selector': this.showEmptySelector,
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
      if (this.modelValue?.label) {
        return this.translateOptions
          ? this.$vt(this.modelValue.label)
          : this.modelValue.label;
      }
      return '';
    },
    inputValue(): string {
      return this.computedOptions[this.pointer]?.label || this.selectedItem;
    },
  },

  methods: {
    scrollToOptionByIndex(index: number) {
      this.$nextTick(() => {
        let option = this.$refs[`option-${index}`] as any;
        // Handle array refs in v-for
        if (Array.isArray(option)) {
          option = option[0];
        }
        const el = option?.$el || option;
        if (el && el.scrollIntoView) {
          this.scrollToView(el);
        }
      });
    },
  },

  watch: {
    pointer(newIndex: number) {
      if (newIndex >= 0 && this.dropdownOpen) {
        this.$nextTick(() => {
          let option = this.$refs[`option-${newIndex}`] as any;
          // Handle array refs in v-for
          if (Array.isArray(option)) {
            option = option[0];
          }
          const el = option?.$el || option;
          if (el && el.scrollIntoView) {
            this.scrollToView(el);
          }
        });
      }
    },
    scrollToOption(option: Option | null) {
      if (option?.id && this.dropdownOpen) {
        const scrollIndex = this.computedOptions.findIndex(
          (opt: Option) => opt.id === option.id,
        );
        if (scrollIndex !== -1) {
          this.scrollToOptionByIndex(scrollIndex);
        }
      }
    },
    dropdownOpen(isOpen: boolean) {
      if (isOpen) {
        // Priority 1: If user has selected a value, always scroll to it
        if (this.modelValue?.id) {
          setTimeout(() => {
            const selectedIndex = this.computedOptions.findIndex(
              (option: Option) => option.id === this.modelValue.id,
            );
            if (selectedIndex !== -1) {
              this.scrollToOptionByIndex(selectedIndex);
            }
          }, 0);
        }
        // Priority 2: If no selection yet, use scrollToOption (initial scroll position)
        else if (this.scrollToOption?.id) {
          setTimeout(() => {
            const scrollIndex = this.computedOptions.findIndex(
              (opt: Option) => opt.id === this.scrollToOption.id,
            );
            if (scrollIndex !== -1) {
              this.scrollToOptionByIndex(scrollIndex);
            }
          }, 0);
        }
      }
    },
  },
});
</script>

<style src="./select-input.scss" lang="scss" scoped></style>
