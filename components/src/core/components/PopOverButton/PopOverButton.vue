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
    />
    <div
      class="oxd-pop-over-button-drop-down"
      v-if="dropdownOpen && options.length > 0"
      :class="dropdownClasses"
      :style="dropDownStyle"
      v-dropdown-direction
    >
      <oxd-pop-over-button-drop-down-option
        v-for="(option, i) in options"
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
import {BOTTOM, DROPDOWN_POSITIONS, Option, Position, TOP} from './types';

export default defineComponent({
  name: 'oxd-pop-over-button',
  directives: {
    'click-outside': clickOutsideDirective,
    'dropdown-direction': dropdownDirectionDirective,
  },
  mixins: [translateMixin],
  components: {
    'oxd-button': OxdButton,
    'oxd-pop-over-button-drop-down-option': PopOverButtonDropDownOption,
  },
  emits: ['click', 'select'],
  props: {
    options: {
      type: Array as PropType<Option[]>,
      default: () => [],
    },
    dropdownPosition: {
      type: String,
      default: BOTTOM,
      validator: (value: Position) => {
        return DROPDOWN_POSITIONS.indexOf(value) !== -1;
      },
    },
    dropDownStyle: {
      type: Object,
    },
  },
  data() {
    return {
      dropdownOpen: false,
      pointer: -1,
    };
  },
  computed: {
    optionClasses(): object[] {
      return this.options.map((option: Option, index: number) => {
        return {
          '--disabled': option.disabled,
          '--focused': index === this.pointer,
        };
      });
    },
    dropdownClasses(): object {
      return {
        '--position-bottom': this.dropdownPosition === BOTTOM,
        '--position-top': this.dropdownPosition === TOP,
      };
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
      if (this.dropdownOpen) return;
      this.dropdownOpen = true;
      this.pointer = 0;
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
      this.pointer = -1;
      this.$emit('click', option.context, option);
      this.dropdownOpen = false;
    },
    onSelectDown() {
      if (this.dropdownOpen) {
        const originalPointer = this.pointer;
        do {
          this.pointer++;
        } while (
          this.pointer < this.options.length &&
          this.options[this.pointer].disabled
        );

        if (this.pointer >= this.options.length) {
          this.pointer = originalPointer;
        }
      }
    },
    onSelectUp() {
      if (this.dropdownOpen) {
        const originalPointer = this.pointer;
        do {
          this.pointer--;
        } while (this.pointer >= 0 && this.options[this.pointer].disabled);

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
          const option = this.options[this.pointer];
          if (!option?.disabled) this.onSelect(option);
        }
      }
    },
  },
});
</script>

<style src="./pop-over-button.scss" scoped lang="scss"></style>
