<template>
  <div
    class="oxd-select-wrapper"
    :class="{'d-flex justify-center': hideDropdownLabel}"
  >
    <oxd-button
      class="dropdown-btn"
      :class="dropdownButtonClasses"
      :label="buttonData.label"
      :iconName="buttonData.iconName"
      :iconSize="buttonData.iconSize"
      :iconStyle="buttonData.iconStyle"
      :hide-dropdown-label="hideDropdownLabel"
      :size="buttonData.size"
      :style="buttonData.style"
      :displayType="buttonData.displayType"
      :tooltip="tooltip"
      :flow="flow"
      @blur="onBlur"
      @click="onToggleDropdown"
      @keyup.esc="onCloseDropdown"
      @keydown.enter.prevent="onSelectEnter"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
      @keydown="onKeypress"
    >
      <template v-if="buttonData.iconImageSrc" v-slot:icon>
        <img :src="buttonData.iconImageSrc" />
      </template>
      <template #label>
        <div
          v-if="buttonData.doubleLineLabel"
          class="label-double-line-wrapper"
          :class="{
            'label-double-line': modelValue,
          }"
        >
          <span class="label-small" v-if="modelValue && modelValue.id > -1">{{
            buttonData.labelMini
          }}</span>
          <span class="label">{{ buttonData.label }}</span>
        </div>
      </template>
      <template v-slot:iconRight>
        <oxd-icon
          class="oxd-button-icon oxd-button-icon-right d-flex align-center"
          style="height: 14px"
          size="medium"
          :name="dropdownOpen ? 'chevron-up' : 'chevron-down'"
        />
      </template>
    </oxd-button>

    <oxd-select-dropdown
      v-if="dropdownOpen"
      :class="dropdownClasses"
      :style="dropdownStyles"
      :loading="loading"
      :empty="computedOptions.length === 0"
      v-click-outside="clickOutside"
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
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import eventsMixin from './events-mixin';
import navigationMixin from './navigation-mixin';
import {TOP, BOTTOM, Option, Position, DROPDOWN_POSITIONS} from '../types';
import clickOutsideDirective from './../../../../directives/click-outside';
import {
  TooltipPosition,
  TOOLTIP_TOP,
  TOOLTIP_POSITIONS,
} from './../../Button/types';
import SelectDropdown from '@orangehrm/oxd/core/components/Input/Select/SelectDropdown.vue';
import SelectOption from '@orangehrm/oxd/core/components/Input/Select/SelectOption.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';

export default defineComponent({
  name: 'oxd-select-input',
  inheritAttrs: false,

  components: {
    'oxd-icon': Icon,
    'oxd-button': Button,
    'oxd-select-dropdown': SelectDropdown,
    'oxd-select-option': SelectOption,
  },

  mixins: [navigationMixin, eventsMixin],

  directives: {
    'click-outside': clickOutsideDirective,
  },

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
    options: {
      type: Array,
      required: true,
    },
    dropdownPosition: {
      type: String,
      default: BOTTOM,
      validator: function(value: TooltipPosition) {
        return DROPDOWN_POSITIONS.indexOf(value) !== -1;
      },
    },
    dropdownStyles: {
      type: Object,
      default: () => null,
    },
    button: {
      type: Object,
      default: () => null,
    },
    hideDropdownLabel: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: null,
    },
    flow: {
      type: String,
      default: TOOLTIP_TOP,
      validator: (value: Position) => {
        return TOOLTIP_POSITIONS.indexOf(value) !== 1;
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
      return this.modelValue?.label ? this.modelValue.label : this.button;
    },
    inputValue(): string {
      return this.computedOptions[this.pointer]?.label || this.selectedItem;
    },
    buttonData(): object {
      const initialObject = {
        label: 'Button',
        labelMini: null,
        iconName: 'plus',
        iconSize: 'small',
        iconStyle: null,
        iconImageSrc: null,
        size: 'long',
        displayType: 'label',
        style: null,
        doubleLineLabel: false,
        showLabel: true,
      };
      for (const key in this.button) {
        const value = this.button[key];
        if (value) {
          initialObject[key] = value;
        }
      }
      return initialObject;
    },
    dropdownButtonClasses(): string {
      return `${this.buttonData.doubleLineLabel ? 'button-double-line' : ''} ${
        this.hideDropdownLabel ? 'no-label' : 'w-100'
      }`;
    },
  },

  methods: {
    clickOutside() {
      this.dropdownOpen = false;
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
