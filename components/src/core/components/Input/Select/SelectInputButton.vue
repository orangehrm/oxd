<template>
  <div class="oxd-select-wrapper">
    <oxd-button
      class="w-100 dropdown-btn"
      :label="buttonData.label"
      :iconName="buttonData.iconName"
      :size="buttonData.size"
      :style="buttonData.style"
      :displayType="buttonData.displayType"
      @click="onToggleDropdown"
    >
      <template v-if="buttonData.iconImageSrc" v-slot:icon>
        <img :src="buttonData.iconImageSrc" />
      </template>
      <template v-slot:iconRight>
        <oxd-icon :name="dropdownOpen ? 'chevron-up' : 'chevron-down'"/>
      </template>
    </oxd-button>

    <oxd-select-dropdown
      v-if="dropdownOpen"
      :class="dropdownClasses"
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
    button: {
      type: Object,
      default: () => null,
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
        iconName: 'plus',
        iconImageSrc: null,
        size: 'long',
        displayType: 'label',
        style: null,
      }
      for (const key in this.button) {
        const value = this.button[key]
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
.dropdown-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  width: 100%;
  ::v-deep(.oxd-icon) {
    font-size: 14px;
  }
}
</style>