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
      />
      <div class="oxd-dropdown-input-icon" v-if="!isLoading">
        <oxd-icon
          v-if="selected.length != 0 && clear"
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
      <ul role="listbox" v-if="open" class="oxd-dropdown-options">
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
        v-for="(option, index) in selected"
        :key="`${index}-selected-${option.id}`"
        :label="option.label"
        class="oxd-dropdown-selected-chip"
      >
        <oxd-icon class="--clear" name="x" @click="onRemoveOption(option)" />
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
import {
  defineComponent,
  onBeforeMount,
  PropType,
  reactive,
  toRefs,
  watch,
} from 'vue';

interface Option {
  id: number;
  label: string;
  disabled: boolean;
  selected: boolean;
}

export default defineComponent({
  name: 'oxd-dropdown-input',

  props: {
    modelValue: {},
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
    preSelect: {
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
    disabledOptions: {
      type: Array as PropType<number[]>,
      default: [],
    },
    selectedOptions: {
      type: Array as PropType<number[]>,
      default: [],
    },
    placeholderText: {
      type: String,
      default: 'Type for hints...',
    },
    options: {
      type: [Array, Function],
      default: () => {
        return [];
      },
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

  setup(props, {emit}) {
    const state = reactive({
      searchTerm: '',
      open: false,
      focused: false,
      selected: [],
      localOptions: [],
      isLoading: false,
      pointer: 0,
    });

    watch(
      () => state.selected,
      function() {
        emit('update:modelValue', state.selected);
      },
    );

    // Mark preselected options
    const preselectOptions = () => {
      if (props.preSelect) {
        if (props.selectedOptions.length > 0) {
          if (props.multiple) {
            props.selectedOptions.forEach(selOption => {
              const itemIndex = state.localOptions.findIndex(
                elem => elem.id === selOption,
              );
              if (itemIndex > -1) {
                const {id, label} = state.localOptions[itemIndex];
                state.selected.push({id, label});
              }
            });
          } else {
            const itemIndex = state.localOptions.findIndex(
              elem => elem.id === props.selectedOptions[0],
            );
            if (itemIndex > -1) {
              const {id, label} = state.localOptions[itemIndex];
              state.selected.push({id, label});
            }
          }
          emit('update:modelValue', state.selected);
        }
      }
    };

    // Add options to select dropdown
    const loadOptions = async () => {
      state.isLoading = true;
      if (Array.isArray(props.options)) {
        // If options are passed as an array set options directly
        state.localOptions = state.localOptions
          .concat(props.options)
          .filter((item, index, arr) => {
            return arr.findIndex(_item => _item.id === item.id) === index;
          });
        if (!props.lazyLoad) {
          preselectOptions();
        }
        state.isLoading = false;
      } else if (typeof props.options === 'function') {
        // If options are passed as a function, do funcation and set options
        new Promise(resolve =>
          resolve((props.options as Function)(state.searchTerm)),
        )
          .then(resolved => {
            if (resolved) {
              state.localOptions = state.localOptions
                .concat(resolved as Array<Object>)
                .filter((item, index, arr) => {
                  return arr.findIndex(_item => _item.id === item.id) === index;
                });
            }
          })
          .finally(() => {
            if (!props.lazyLoad) {
              preselectOptions();
            }
            state.isLoading = false;
          });
      }
    };

    if (!props.lazyLoad) {
      onBeforeMount(loadOptions);
    } else {
      watch(() => state.searchTerm, loadOptions);
    }

    return {
      ...toRefs(state),
    };
  },

  computed: {
    filteredOptions(): Option[] {
      const filter = new RegExp(this.searchTerm, 'i');
      return this.localOptions
        .filter(option => option.label.match(filter))
        .map(option => {
          return {
            id: option.id,
            label: option.label,
            disabled:
              this.disabledOptions.findIndex(item => item == option.id) > -1,
            selected:
              this.selected.findIndex(item => item.id == option.id) > -1,
          };
        });
    },
    placeholder(): string {
      return !this.multiple && this.selected.length != 0
        ? this.selected[0].label
        : this.placeholderText.replace(/'/g, '');
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
          this.openDropdown();
        } else {
          this.closeDropdown();
        }
      }
    },
    onDropdownClear() {
      this.selected = [];
      this.$emit('dropdown:cleared');
    },
    onSelectOption({id, label, disabled, selected}) {
      if (disabled || selected) {
        return;
      }
      if (!this.multiple) {
        this.selected = [];
      }
      this.selected.push({id, label});
      this.searchTerm = '';
      this.closeDropdown();
    },
    onRemoveOption(item: Option) {
      const itemIndex = this.selected.findIndex(elem => elem.id === item.id);
      if (itemIndex > -1) {
        this.selected.splice(itemIndex, 1);
      }
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
<style lang="scss">
.oxd-loading-spinner {
  width: 1rem !important;
  height: 1rem !important;
}
</style>
