<template>
  <div
    class="oxd-select-wrapper"
    :class="{'d-flex justify-center': hideDropdownLabel}"
    v-click-outside="clickOutside"
    :style="getCustomColor"
  >
    <oxd-button
      class="dropdown-btn"
      :class="dropdownButtonClasses"
      :label="modelValue ? modelValue.label : buttonData.label"
      :iconName="buttonIconName"
      :iconSize="buttonData.iconSize"
      :iconStyle="buttonData.iconStyle"
      :hide-dropdown-label="hideDropdownLabel"
      :size="buttonData.size"
      :style="buttonData.style"
      :displayType="buttonData.displayType"
      :tooltip="$vt(tooltip)"
      :flow="flow"
      :disabled="disabled"
      @blur="onBlur"
      @keyup.esc="onCloseDropdown"
      @keydown.enter.prevent="onSelectEnter"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
      @keydown="onKeypress"
      @click="wholeButtonClickable ? onToggleDropdown() : {}"
    >
      <template v-if="buttonData.iconImageSrc" v-slot:icon>
        <img :src="buttonData.iconImageSrc" />
      </template>
      <template
        v-if="!hideDropdownLabel && doubleLineLabel && modelValue"
        #label
      >
        <div
          class="label-double-line-wrapper w-100"
          :class="{
            'label-double-line': modelValue,
          }"
        >
          <div class="label-small w-100 d-flex align-center justify-between">
            <div class="w-100 d-flex align-center justify-start">
              <oxd-icon
                :size="buttonData.iconSize"
                :style="buttonData.iconStyle"
                :name="buttonData.iconName"
                class="mini-icon-left"
              />
              <span>{{ $vt(buttonData.labelMini) }}</span>
            </div>
            <div
              class="d-flex
                align-center
                justify-center oxd-select-info-button-container"
              v-if="additionalIconName"
            >
              <oxd-icon
                :tooltip="$vt(additionalIconTooltip)"
                :flow="moreTooltipFlow"
                class="oxd-select-info-button"
                :size="additionalIconSize"
                :name="additionalIconName"
                @click="$emit('onAdditionalIconClick')"
              />
            </div>
            <div
              class="
                d-flex
                align-center
                justify-center
                oxd-select-info-button-container
              "
              v-if="moreIconName"
            >
              <oxd-icon
                :tooltip="$vt(moreTooltip)"
                :flow="moreTooltipFlow"
                class="oxd-select-info-button"
                :size="moreIconSize"
                :name="moreIconName"
                @click="$emit('onMoreClick')"
              />
            </div>
          </div>
          <div class="w-100 d-flex align-center justify-between">
            <span class="label">{{ $vt(modelValue.label) }}</span>
            <oxd-icon-button
              :name="
                dropdownOpen
                  ? dropdownTriggerCloseIcon
                  : dropdownTriggerOpenIcon
              "
              size="xxx-small"
              class="oxd-select-dropdown-trigger"
              @click="wholeButtonClickable ? {} : onToggleDropdown()"
              :iconStyles="dropdownTriggerIconStyles"
              :style="dropdownTriggerButtonStyles"
              :class="{
                'custom-background-color': dropdownTriggerButtonBackgroundColor
                  ? true
                  : false,
              }"
            />
          </div>
        </div>
      </template>
      <template
        v-if="!hideDropdownLabel && doubleLineLabel ? !modelValue : true"
        v-slot:iconRight
      >
        <oxd-icon-button
          :name="
            dropdownOpen ? dropdownTriggerCloseIcon : dropdownTriggerOpenIcon
          "
          size="xxx-small"
          class="oxd-select-dropdown-trigger"
          :class="{
            'dropdown-minimized': hideDropdownLabel && doubleLineLabel,
            'custom-background-color': dropdownTriggerButtonBackgroundColor
              ? true
              : false,
          }"
          @click="wholeButtonClickable ? {} : onToggleDropdown()"
          :disabled="disabled"
          :iconStyles="dropdownTriggerIconStyles"
          :style="dropdownTriggerButtonStyles"
        />
      </template>
    </oxd-button>

    <oxd-select-dropdown
      v-if="dropdownOpen"
      :class="dropdownClasses"
      :style="dropdownStyles"
      :loading="loading"
      :empty="computedOptions.length === 0"
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
        <span v-if="!$slots['option']">{{ $vt(option.label) }}</span>
      </oxd-select-option>
    </oxd-select-dropdown>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import eventsMixin from './events-mixin';
import navigationMixin from './navigation-mixin';
import translateMixin from '../../../../mixins/translate';
import {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
  Option,
  Position,
  DROPDOWN_POSITIONS,
} from '../types';
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
import ButtonIcon from '@orangehrm/oxd/core/components/Button/Icon.vue';

export default defineComponent({
  name: 'oxd-select-input',
  inheritAttrs: false,

  components: {
    'oxd-icon': Icon,
    'oxd-button': Button,
    'oxd-icon-button': ButtonIcon,
    'oxd-select-dropdown': SelectDropdown,
    'oxd-select-option': SelectOption,
  },

  mixins: [navigationMixin, eventsMixin, translateMixin],

  directives: {
    'click-outside': clickOutsideDirective,
  },

  emits: [
    'update:modelValue',
    'dropdown:opened',
    'dropdown:closed',
    'dropdown:blur',
    'dropdown:clear',
    'onAdditionalIconClick',
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
    dropdownTriggerIconStyles: {
      type: Object,
    },
    dropdownTriggerOpenIcon: {
      type: String,
      default: 'oxd-chevron-down',
    },
    dropdownTriggerCloseIcon: {
      type: String,
      default: 'oxd-chevron-up',
    },
    dropdownTriggerButtonBackgroundColor: {
      type: String,
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
    moreIconName: {
      type: String,
    },
    moreIconSize: {
      type: String,
      default: 'xx-small',
    },
    moreTooltip: {
      type: String,
      default: null,
    },
    moreTooltipFlow: {
      type: String,
      default: TOOLTIP_TOP,
      validator: (value: Position) => {
        return TOOLTIP_POSITIONS.indexOf(value) !== 1;
      },
    },
    doubleLineLabel: {
      type: Boolean,
      default: false,
    },
    wholeButtonClickable: {
      type: Boolean,
      default: false,
    },
    additionalIconName: {
      type: String,
      default: null,
      required: false,
    },
    additionalIconTooltip: {
      type: String,
      default: null,
      required: false,
    },
    additionalIconSize: {
      type: String,
      default: 'xx-small',
      required: false,
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
    buttonIconName(): boolean {
      if (this.hideDropdownLabel) {
        return this.buttonData.iconName;
      } else {
        if (this.doubleLineLabel) {
          if (!this.modelValue) {
            return this.buttonData.iconName;
          } else {
            return null;
          }
        } else {
          return this.buttonData.iconName;
        }
      }
    },
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
        '--positon-left': this.dropdownPosition === LEFT,
        '--positon-right': this.dropdownPosition === RIGHT,
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
        : this.button;
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
      return `${this.doubleLineLabel ? 'button-double-line' : ''} ${
        this.hideDropdownLabel ? 'no-label' : 'w-100'
      }`;
    },
    getCustomColor() {
      if (this.dropdownTriggerButtonBackgroundColor) {
        return {
          '--custom-dropdown-trigger-button-color':
            this.dropdownTriggerButtonBackgroundColor +
            this.percentageToHex(0.1),
          '--custom-dropdown-trigger-button-color-active':
            this.dropdownTriggerButtonBackgroundColor +
            this.percentageToHex(0.2),
          '--custom-dropdown-trigger-button-color-hover':
            this.dropdownTriggerButtonBackgroundColor +
            this.percentageToHex(0.15),
        };
      }
      return {};
    },
  },

  methods: {
    clickOutside() {
      this.dropdownOpen = false;
    },
    percentageToHex(percent: number) {
      return `0${Math.round(255 * percent).toString(16)}`.slice(-2);
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

<style src="./select-input-button.scss" lang="scss" scoped></style>
