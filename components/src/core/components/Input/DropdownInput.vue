<template>
  <div
    class="oxd-dropdown-container"
    @keyup.esc="closeDropdown"
    @keydown.enter.prevent="onSelectEnter"
    @keydown.down.exact.prevent="onSelectDown"
    @keydown.up.exact.prevent="onSelectUp"
  >
    <div class="oxd-dropdown-input">
      <oxd-input
        :hasError="hasError"
        :placeholder="placeholder"
        :disabled="disabled"
        @update:modelValue="onSearchUpdate"
        @click="toggleDropdown"
        @blur="onBlur"
        ref="oxdInput"
      />
      <div
        v-if="!isLoading"
        :class="{'oxd-dropdown-input-icon': true, '--disabled': disabled}"
      >
        <oxd-icon
          v-if="selectedOptions.length != 0 && clear && !disabled"
          class="--clear"
          name="x"
          @click="onDropdownClear"
        />
        <oxd-icon
          class="--arrow"
          :name="open ? 'caret-up-fill' : 'caret-down-fill'"
          @click="toggleDropdown"
        />
      </div>
      <oxd-loading-spinner
        class="oxd-dropdown-input-loader"
        v-else
        :with-container="false"
      />
    </div>
    <transition name="transition-fade-down">
      <ul
        role="listbox"
        v-if="open"
        class="oxd-dropdown-options"
        v-dropdown-direction
      >
        <li
          v-for="(option, index) in filteredOptions"
          :ref="`optElm-${index}`"
          role="option"
          :key="`${index}-options-${option.id}`"
          :class="{
            'oxd-dropdown-options-item': true,
            '--disabled': option.disabled,
            '--selected': option.selected,
            '--focused': isFocused(index),
            [`--indent-${option.indent}`]: true,
          }"
          @mousedown="onSelectOption(option)"
        >
          {{ option.label }}
        </li>
        <li
          v-if="filteredOptions.length === 0"
          class="oxd-dropdown-options-item --disabled"
        >
          No options
        </li>
      </ul>
    </transition>
    <div class="oxd-dropdown-selected" v-if="multiple">
      <oxd-chip
        v-for="(option, index) in selectedOptions"
        :key="`${index}-selected-${option.id}`"
        :label="option.label"
        class="oxd-dropdown-selected-chip"
      >
        <oxd-icon
          :class="{'--clear': true, '--disabled': disabled}"
          name="x"
          @click="onRemoveOption(option)"
        />
      </oxd-chip>
    </div>
  </div>
</template>

<script lang="ts">
import Chip from '@orangehrm/oxd/core/components/Chip/Chip.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import Spinner from '@orangehrm/oxd/core/components/Loader/Spinner.vue';
import debounce from '../../../utils/debounce';
import dropdownDirectionDirective from '../../../directives/dropdown-direction';

import {defineComponent, onBeforeMount, PropType, reactive, toRefs} from 'vue';

interface Option {
  id: number;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  indent?: number;
}

export default defineComponent({
  name: 'oxd-dropdown-input',

  directives: {
    'dropdown-direction': dropdownDirectionDirective,
  },

  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array as PropType<Option[]>,
      default: () => [],
    },
    disabledOptions: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    createOptions: {
      type: Function,
      required: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clear: {
      type: Boolean,
      default: true,
    },
    lazyLoad: {
      type: Boolean,
      default: false,
    },
    placeholderText: {
      type: String,
      default: 'Type for hints...',
    },
  },

  emits: [
    'update:modelValue',
    'blur',
    'dropdown:cleared',
    'dropdown:opened',
    'dropdown:closed',
  ],

  components: {
    'oxd-chip': Chip,
    'oxd-icon': Icon,
    'oxd-input': Input,
    'oxd-loading-spinner': Spinner,
  },

  setup(props) {
    const state = reactive({
      searchTerm: '',
      open: false,
      focused: false,
      localOptions: [...props.options],
      isLoading: false,
      pointer: 0,
    });

    // Load options to dropdown via function
    const loadOptions = async () => {
      state.isLoading = true;
      new Promise(resolve => resolve(props.createOptions(state.searchTerm)))
        .then(resolved => {
          if (resolved && Array.isArray(resolved)) {
            if (resolved.length > 0) {
              state.localOptions = state.localOptions
                // eslint-disable-next-line
                .concat(resolved as Array<any>)
                .filter((item, index, arr) => {
                  return arr.findIndex(_item => _item.id === item.id) === index;
                });
            }
          }
        })
        .finally(() => {
          state.isLoading = false;
        });
    };

    if (!props.lazyLoad && props.createOptions) {
      onBeforeMount(loadOptions);
    }

    return {
      ...toRefs(state),
      loadOptions,
    };
  },

  computed: {
    selectedOptions(): Option[] {
      return this.modelValue?.length > 0 ? this.modelValue : [];
    },
    filteredOptions(): Option[] {
      const filter = new RegExp(this.searchTerm, 'i');
      const _options = this.localOptions.filter(option =>
        option.label.match(filter),
      );

      // When all local options are exahusted try API
      if (
        this.searchTerm.length > 0 &&
        _options.length === 0 &&
        this.createOptions
      ) {
        this.loadOptions();
      }

      return _options.map(option => {
        return {
          id: option.id,
          label: option.label,
          disabled:
            this.disabledOptions.findIndex(item => item == option.id) > -1,
          selected:
            this.selectedOptions.findIndex(item => item.id == option.id) > -1,
          indent: option?.indent ? option.indent : 1,
        };
      });
    },
    placeholder(): string {
      const placeholder = !this.disabled
        ? this.placeholderText.replace(/'/g, '')
        : '';
      return !this.multiple && this.selectedOptions.length != 0
        ? this.selectedOptions[0].label
        : placeholder;
    },
  },

  methods: {
    onBlur() {
      this.closeDropdown();
      this.$emit('blur');
    },
    onSearchUpdate(value: string) {
      this.search(this, value);
    },
    search: debounce((vm, value: string) => {
      vm.searchTerm = value;
    }, 500),
    toggleDropdown() {
      if (!this.disabled) {
        if (!this.open) {
          this.$refs.oxdInput.$el.focus();
          this.openDropdown();
        } else {
          this.closeDropdown();
        }
      }
    },
    onDropdownClear() {
      if (this.disabled) {
        return;
      }
      this.$emit('update:modelValue', []);
      this.$emit('dropdown:cleared');
    },
    onSelectOption({id, label, disabled, selected}) {
      if (disabled || selected) {
        return;
      }
      let _selOpts = JSON.parse(JSON.stringify(this.selectedOptions));
      if (!this.multiple) {
        _selOpts = [];
      }
      _selOpts.push({id, label});
      this.$emit('update:modelValue', _selOpts);
      this.searchTerm = '';
      this.closeDropdown();
    },
    onRemoveOption(item: Option) {
      if (this.disabled) {
        return;
      }
      const _selOpts = JSON.parse(JSON.stringify(this.selectedOptions));
      const itemIndex = _selOpts.findIndex(elem => elem.id === item.id);
      if (itemIndex > -1) {
        _selOpts.splice(itemIndex, 1);
      }
      this.$emit('update:modelValue', _selOpts);
      this.closeDropdown();
    },
    openDropdown() {
      this.open = true;
      this.$emit('dropdown:opened');
    },
    closeDropdown() {
      this.open = false;
      this.searchTerm = '';
      this.pointer = 0;
      this.$emit('dropdown:closed');
    },
    onSelectDown() {
      if (this.open) {
        if (this.filteredOptions.length > this.pointer) {
          this.pointer++;
        } else {
          this.pointer = this.filteredOptions.length;
        }
      }
    },
    onSelectUp() {
      if (this.open) {
        if (this.pointer > 1) {
          this.pointer--;
        } else {
          this.pointer = 1;
        }
      }
    },
    onSelectEnter() {
      if (!this.open) {
        this.openDropdown();
      } else {
        if (this.pointer > 0) {
          this.onSelectOption(this.filteredOptions[this.pointer - 1]);
        }
      }
    },
    isFocused(index: number) {
      if (index === this.pointer - 1) {
        this.scrollToView(this.$refs[`optElm-${index}`]);
        return true;
      } else {
        return false;
      }
    },
    scrollToView(elm: HTMLElement) {
      elm.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    },
  },
});
</script>

<style src="./dropdown-input.scss" lang="scss" scoped></style>
