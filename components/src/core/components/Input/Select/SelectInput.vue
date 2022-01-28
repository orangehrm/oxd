<template>
  <div class="oxd-select-wrapper">
    <oxd-select-text
      v-bind="$attrs"
      :value="inputValue"
      :disabled="disabled"
      :dropdownOpened="dropdownOpen"
      @icon:clicked="onOpenDropdown"
      @blur="onBlur"
      @click="onOpenDropdown"
      @keyup.esc="onCloseDropdown"
      @keydown.enter.prevent="onSelectEnter"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
      @keydown="onKeypress"
    >
      <template v-slot:afterInput>
        <slot v-if="modelValue" name="afterSelected" :data="modelValue"></slot>
      </template>
    </oxd-select-text>

    <oxd-select-dropdown
      v-if="dropdownOpen"
      :class="dropdownClasses"
      :loading="loading"
      :empty="computedOptions.length === 0"
    >
      <oxd-select-option
        v-if="showEmptySelector && !hideDropdownDefaultLabel"
        @select="onClear"
      >
        {{ $vt(placeholder) }}
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
        <span v-if="!$slots['option']">{{ $vt(option.label) }}</span>
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

export default defineComponent({
  name: 'oxd-select-input',
  inheritAttrs: false,

  components: {
    'oxd-select-text': SelectText,
    'oxd-select-dropdown': SelectDropdown,
    'oxd-select-option': SelectOption,
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
    hideDropdownDefaultLabel: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: '-- Select --',
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
      default: true,
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
        ? this.$vt(this.modelValue.label)
        : this.hideDropdownDefaultLabel
        ? null
        : this.$vt(this.placeholder);
    },
    inputValue(): string {
      return this.computedOptions[this.pointer]?.label || this.selectedItem;
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

<style src="./select-input.scss" lang="scss" scoped></style>
