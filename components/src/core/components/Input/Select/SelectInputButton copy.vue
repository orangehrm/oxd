<template>
  <div class="oxd-select-wrapper">
    <oxd-button
      class="w-100 dropdown-btn"
      :label="buttonData.label"
      :iconName="buttonData.iconName"
      :size="buttonData.size"
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
        <oxd-button
          class="chip-button"
          :label="option.count"
          :size="'small'"
          :displayType="option.displayType"
        ></oxd-button>
        <p class="oxd-label">{{option.label}}</p>
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
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'oxd-select-input',
  inheritAttrs: false,

  components: {
    'oxd-icon': Icon,
    'oxd-button': Button,
    'oxd-select-text': SelectText,
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
    button: {
      type: Object,
      default: () => {}
    },
    openDropdownInitially: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      focused: false,
      loading: false,
      dropdownOpen: this.openDropdownInitially || false,
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
      return this.modelValue?.label ? this.modelValue.label : this.button.label;
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
        displayType: 'label'
      }
      for (var key in this.button) {
        const value = this.button[key]
        if (initialObject[key] && value) {
          initialObject[key] = value
        }
      }
      return initialObject
    }
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
<style src="./../../TableSidebar/table-sidebar.scss" lang="scss" scoped></style>

<style lang="scss" scoped>
.chip-button {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  min-width: unset;
}
.oxd-label {
  margin-left: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.dropdown-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  i {
    font-size: 14px;
  }
}
.oxd-select-wrapper {
  ::v-deep(.oxd-select-dropdown) {
    max-height: calc(100vh - 200px);
    border: none;
    box-shadow: none;
  }
}
</style>