<template>
  <div class="oxd-select-wrapper" :class="{'--selected': modelValue}">
    <button
      v-bind="$attrs"
      class="oxd-select-fill-container"
      :style="infoBoxContainerStyles"
      :class="classes"
      :disabled="disabled"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.esc="onCloseDropdown"
      @keydown.enter.prevent="onSelectEnter"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
      @keydown="onKeypress"
      @click.prevent=""
      v-click-outside="clickOutside"
    >
      <div class="d-flex flex-wrap w-100 h-100">
        <div
          class="
            d-flex
            align-start
            justify-start
            w-100
            oxd-select-fill-title-row
            --mb
          "
          :style="titleWrapperStyles"
        >
          <label class="oxd-select-fill-title" :style="titleLabelStyles">{{
            $vt(infoLabel)
          }}</label>
        </div>
        <div
          class="
            d-flex
            align-end
            justify-between
            oxd-select-fill-subtitle-row
            w-100
          "
        >
          <div
            class="
              d-flex
              align-start
              justify-start
              oxd-select-fill-subtitle-wrapper
            "
            :class="{'flex-wrap': clickableText}"
            :style="subtitleWrapperStyles"
          >
            <slot></slot>
            <label
              class="oxd-select-fill-subtitle text-left"
              :style="selectedItemLabelStyles"
              v-if="!$slots['default']"
            >
              {{ $vt(getLabel) }}
            </label>
            <span
              class="oxd-info-box-clickable-text"
              v-if="clickableText"
              @click="clickText"
              >{{ clickableText }}</span
            >
          </div>
          <div
            v-if="!(isModelValueString || disabled)"
            class="d-flex align-center justify-start"
          >
            <oxd-icon-button
              :name="dropdownOpen ? 'oxd-chevron-up' : 'oxd-chevron-down'"
              size="xxx-small"
              class="oxd-select-dropdown-trigger"
              :class="{'cursor-default': readonly}"
              :style="infoBoxTriggerButtonStyles"
              :disabled="readonly"
              @click="onToggleDropdown"
              @blur="onBlur"
            />
          </div>
        </div>
      </div>
    </button>
    <oxd-select-dropdown
      v-if="dropdownOpen && !isModelValueString"
      :class="dropdownClasses"
      :style="dropdownStyles"
      :loading="loading"
      :empty="computedOptions.length === 0"
      @blur="onBlur"
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
import eventsMixin from './../Input/Select/events-mixin';
import navigationMixin from './../Input/Select/navigation-mixin';
import translateMixin from '../../../mixins/translate';
import {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
  Option,
  DROPDOWN_POSITIONS,
} from './../Input/types';
import clickOutsideDirective from './../../../directives/click-outside';
import {TooltipPosition} from './../Button/types';
import SelectDropdown from '@orangehrm/oxd/core/components/Input/Select/SelectDropdown.vue';
import SelectOption from '@orangehrm/oxd/core/components/Input/Select/SelectOption.vue';
import ButtonIcon from '@orangehrm/oxd/core/components/Button/Icon.vue';
import {hexToRgb} from './../../../utils/colorConverter';

export default defineComponent({
  name: 'oxd-infobox',
  inheritAttrs: false,

  components: {
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
  ],

  props: {
    modelValue: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
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
      default: () => [],
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
    numOfTitleRows: {
      type: Number,
      default: 1,
    },
    numOfValueRows: {
      type: Number,
      default: 2,
    },
    infoLabel: {
      type: String,
    },
    titleLineHeight: {
      type: Number,
      default: () => 22,
    },
    subtitleLineHeight: {
      type: Number,
      default: () => 19,
    },
    clickableText: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      focused: false,
      loading: false,
      dropdownOpen: false,
    };
  },

  watch: {
    pointer(newIndex: number) {
      const option = this.$refs[`option-${newIndex}`];
      if (Array.isArray(option) && option.length > 0) {
        if (option[0]?.$el) this.scrollToView(option[0].$el);
      } else {
        if (option?.$el) this.scrollToView(option.$el);
      }
    },
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
    titleLabelStyles(): {
      '-webkit-line-clamp'?: number;
    } {
      return {
        '-webkit-line-clamp': this.numOfTitleRows,
      };
    },
    lineClamp() {
      return this.clickableText
        ? this.numOfValueRows > 1
          ? this.numOfValueRows - 1
          : 1
        : this.numOfValueRows;
    },
    selectedItemLabelStyles(): {
      color: string | null;
      'font-weight'?: number;
      '-webkit-line-clamp'?: number;
    } {
      return {
        color: hexToRgb(this.modelValue?.color),
        '-webkit-line-clamp': this.lineClamp,
        'font-weight': this.modelValue?.color ? 700 : 600,
      };
    },
    infoBoxContainerStyles(): {
      'background-color': string | null;
    } {
      return {
        'background-color': hexToRgb(this.modelValue?.color, '7%'),
      };
    },
    infoBoxTriggerButtonStyles(): {
      color: string | null;
      'background-color': string | null;
    } {
      return {
        color: hexToRgb(this.modelValue?.color),
        'background-color': hexToRgb(this.modelValue?.color, '10%'),
      };
    },
    isModelValueString(): boolean {
      return typeof this.modelValue === 'string';
    },
    // modelValue can be anything
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getLabel(): any {
      if (this.isModelValueString) {
        return this.modelValue;
      } else {
        return this.modelValue ? this.modelValue.label : null;
      }
    },
    subtitleWrapperStyles(): {
      height: string;
    } {
      const noOfRows =
        this.clickableText && this.numOfValueRows <= 1
          ? 2
          : this.numOfValueRows;
      const subtitleWrapperHeight = noOfRows * this.subtitleLineHeight;
      return {
        height: `${subtitleWrapperHeight}px`,
      };
    },
    titleWrapperStyles(): {
      height: string;
    } {
      const titleWrapperHeight = this.numOfTitleRows * this.titleLineHeight;
      return {
        height: `${titleWrapperHeight}px`,
      };
    },
    classes(): object {
      return {
        'oxd-select-fill-container--focus': this.focused,
        'oxd-select-fill-container--error': this.hasError,
        'oxd-select-fill-container--disabled': this.disabled,
        'oxd-select-fill-container--readonly': this.readonly,
      };
    },
  },

  methods: {
    onFocus($e: Event) {
      if (this.disabled) {
        $e.stopImmediatePropagation();
      } else {
        this.focused = true;
      }
    },
    onBlur($e: Event) {
      this.focused = false;
      this.dropdownOpen = false;
      this.$emit('blur', $e);
    },
    clickOutside() {
      this.dropdownOpen = false;
    },
    clickText() {
      this.$emit('click-label', this.modelValue);
    },
  },
});
</script>

<style src="./info-box.scss" lang="scss" scoped></style>
