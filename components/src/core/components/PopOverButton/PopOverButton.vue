<template>
  <div class="oxd-button-pop-over" v-click-outside="clickOutside">
    <oxd-button
      v-bind="$attrs"
      @click.stop="onToggleDropdown"
      @blur="onBlur"
      @keyup.esc="onCloseDropdown"
      @keydown.enter.prevent="onSelectEnter"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
      :label="$vt(popOverButtonLabel)"
      :style="popOverButtonStyle"
    />
    <div
      class="oxd-pop-over-button-drop-down"
      v-if="dropdownOpen && computedOptions.length > 0"
      :class="dropdownClasses"
      :style="dropDownStyle"
      v-dropdown-direction
    >
      <oxd-pop-over-button-drop-down-option
        v-for="(option, i) in computedOptions"
        :key="i"
        :disabled="option.disabled"
        @select="onSelect(option)"
        @blur="onBlur"
        :class="optionClasses[i]"
      >
        <slot name="option" :data="option"></slot>
        <span v-if="!$slots['option']">{{ $vt(option.label) }}</span>
      </oxd-pop-over-button-drop-down-option>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import OxdButton from '@orangehrm/oxd/core/components/Button/Button.vue';
import clickOutsideDirective from '../../../directives/click-outside';
import dropdownDirectionDirective from '../../../directives/dropdown-direction';
import translateMixin from '../../../mixins/translate';
import PopOverButtonDropDownOption from './PopOverButtonDropDownOption.vue';
import {
  BOTTOM,
  DropdownAlignment,
  DROPDOWN_ALIGHMENT,
  DROPDOWN_POSITIONS,
  LEFT,
  Option,
  Position,
  RIGHT,
  TOP,
  CENTER,
} from './types';

export default defineComponent({
  name: 'oxd-pop-over-button',
  inheritAttrs: false,
  directives: {
    'click-outside': clickOutsideDirective,
    'dropdown-direction': dropdownDirectionDirective,
  },
  mixins: [translateMixin],
  components: {
    'oxd-button': OxdButton,
    'oxd-pop-over-button-drop-down-option': PopOverButtonDropDownOption,
  },
  emits: ['click', 'update:modelValue'],
  props: {
    modelValue: {type: Object},
    options: {
      type: Array as PropType<Option[]>,
      required: true,
    },
    dropdownPosition: {
      type: String,
      default: BOTTOM,
      validator: (value: Position) => {
        return DROPDOWN_POSITIONS.indexOf(value) !== -1;
      },
    },
    dropdownAlignment: {
      type: String,
      default: RIGHT,
      validator: (value: DropdownAlignment) => {
        return DROPDOWN_ALIGHMENT.indexOf(value) !== -1;
      },
    },
    dropDownStyle: {
      type: Object,
    },
    customPopOverButtonLabel: {
      type: String,
    },
    popOverButtonStyle: {
      type: Object,
      default: () => ({}),
    },
    dropdownArrow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dropdownOpen: false,
      pointer: 0,
    };
  },
  computed: {
    computedOptions(): Option[] {
      return (
        this.options?.map((option: Option) => {
          return {
            ...option,
            _selected: this.modelValue?.context === option.context,
          };
        }) || []
      );
    },
    optionClasses(): object[] {
      return this.computedOptions.map((option: Option, index: number) => {
        return {
          '--default': !this.$slots['option'],
          '--disabled': option.disabled,
          '--focused': index === this.pointer,
          '--selected': option._selected,
        };
      });
    },
    dropdownClasses(): object {
      return {
        '--arrow': this.dropdownArrow,
        '--align-left': this.dropdownAlignment === LEFT,
        '--align-right': this.dropdownAlignment === RIGHT,
        '--align-center': this.dropdownAlignment === CENTER,
        '--positon-bottom': this.dropdownPosition === BOTTOM,
        '--positon-top': this.dropdownPosition === TOP,
      };
    },
    popOverButtonLabel(): string {
      if (this.customPopOverButtonLabel) {
        return this.customPopOverButtonLabel;
      } else {
        return this.modelValue ? this.modelValue.label : '';
      }
    },
  },
  methods: {
    clickOutside() {
      this.onCloseDropdown(null);
    },
    onToggleDropdown() {
      if (!this.dropdownOpen) {
        this.openDropdown();
      } else {
        this.onCloseDropdown(null);
      }
    },
    openDropdown() {
      this.pointer = 0;
      if (this.dropdownOpen) return;
      this.dropdownOpen = true;
    },
    onCloseDropdown($e: KeyboardEvent | null) {
      if (!this.dropdownOpen) return;
      if ($e && $e.key === 'Escape' && this.dropdownOpen) $e.stopPropagation();
      this.dropdownOpen = false;
    },
    onBlur() {
      this.onCloseDropdown(null);
    },
    onSelect(option: Option) {
      this.$emit('click', option.context, option);
      this.$emit('update:modelValue', option);
      this.pointer = -1;
      this.dropdownOpen = false;
    },
    onSelectDown() {
      if (this.dropdownOpen) {
        const originalPointer = this.pointer;
        do {
          this.pointer++;
        } while (
          this.pointer < this.computedOptions.length &&
          this.computedOptions[this.pointer].disabled
        );

        if (this.pointer >= this.computedOptions.length) {
          this.pointer = originalPointer;
        }
      }
    },
    onSelectUp() {
      if (this.dropdownOpen) {
        const originalPointer = this.pointer;
        do {
          this.pointer--;
        } while (
          this.pointer >= 0 &&
          this.computedOptions[this.pointer].disabled
        );

        if (this.pointer < 0) {
          this.pointer = originalPointer;
        }
      }
    },
    onSelectEnter() {
      if (!this.dropdownOpen) {
        this.openDropdown();
      } else {
        if (this.pointer >= 0) {
          const option = this.computedOptions[this.pointer];
          if (!option?.disabled) this.onSelect(option);
        }
      }
    },
  },
});
</script>

<style src="./pop-over-button.scss" scoped lang="scss"></style>
