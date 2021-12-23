<template>
  <div class="oxd-select-wrapper">
    <oxd-button
      class="dropdown-btn"
      :class="
        ({'button-double-line': buttonData.doubleLineLabel},
        hideDropdownLabel ? 'no-label' : 'w-100')
      "
      :label="buttonData.label"
      :iconName="buttonData.iconName"
      :hide-dropdown-label="hideDropdownLabel"
      :size="buttonData.size"
      :style="buttonData.style"
      :displayType="buttonData.displayType"
      :tooltip="tooltip"
      :flow="flow"
      @click="onToggleDropdown"
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
          <span class="label-small" v-if="modelValue && modelValue.id > -1"
            >Vacancy</span
          >
          <span
            class="label"
            v-text="buttonData.label"
          ></span>
        </div>
      </template>
      <template v-slot:iconRight>
        <oxd-icon :name="dropdownOpen ? 'chevron-up' : 'chevron-down'" />
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
      validator: function(value: Position) {
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
      default: 'top',
    }
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
        iconName: 'plus',
        iconImageSrc: null,
        size: 'long',
        displayType: 'label',
        style: null,
        doubleLineLabel: false,
        showLabel: true,
      }
      for (const key in this.button) {
        const value = this.button[key];
        if (value) {
          initialObject[key] = value;
        }
      }
      return initialObject;
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

<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
.no-label {
  min-width: initial;
  ::v-deep(.oxd-button-label-wrapper) {
    display: none;
  }
  ::v-deep(.oxd-icon.bi-chevron-down) {
    display: none !important;
  }
  ::v-deep(.oxd-icon.bi-chevron-up) {
    display: none !important;
  }
}
.dropdown-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  ::v-deep(.oxd-icon) {
    font-size: 14px;
  }
  &.button-double-line {
    padding: 0.65rem 1rem;
  }
}
.label-double-line-wrapper {
  padding: 0 1rem;
  &.label-double-line {
    * {
      display: block;
      text-align: left;
      width: 100%;
    }
    .label-small {
      margin-bottom: 0.25rem;
      font-size: 0.75rem;
    }
    .label {
      font-size: 0.875rem;
      font-weight: 600;
    }
  }
}
</style>
