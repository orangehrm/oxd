import {defineComponent} from 'vue';
import {Option} from '../types';

interface State {
  dropdownOpen: boolean;
  pointer: number;
}

export const eventsMixin = defineComponent({
  props: ['modelValue', 'disabled', 'readonly', 'scrollToOption'],
  data(): State {
    return {
      dropdownOpen: false,
      pointer: -1,
    };
  },
  methods: {
    onOpenDropdown() {
      if (this.disabled || this.readonly || this.dropdownOpen) return;
      this.dropdownOpen = true;
      this.$emit('dropdown:opened');

      if (this.modelValue?.id) {
        setTimeout(() => {
          const selectedIndex = this.computedOptions.findIndex(
            (option: Option) => option.id === this.modelValue.id,
          );
          if (selectedIndex !== -1) {
            this.scrollToOptionByIndex(selectedIndex);
          }
        }, 0);
      } else if (this.scrollToOption?.id) {
        setTimeout(() => {
          const scrollIndex = this.computedOptions.findIndex(
            (option: Option) => option.id === this.scrollToOption.id,
          );
          if (scrollIndex !== -1) {
            this.scrollToOptionByIndex(scrollIndex);
          }
        }, 0);
      }
    },
    onCloseDropdown($e: KeyboardEvent | null) {
      if (this.disabled || this.readonly || !this.dropdownOpen) return;
      if ($e && $e.key === 'Escape' && this.dropdownOpen) $e.stopPropagation();
      this.dropdownOpen = false;
      this.$emit('dropdown:closed');
    },
    onToggleDropdown() {
      if (!this.dropdownOpen) {
        this.onOpenDropdown();
      } else {
        this.onCloseDropdown(null);
      }
    },
    onBlur() {
      this.onCloseDropdown(null);
      this.$emit('dropdown:blur');
    },
    onSelect(option: Option) {
      this.pointer = -1;
      this.dropdownOpen = false;
      if (Array.isArray(this.modelValue)) {
        this.$emit('update:modelValue', [...this.modelValue, option]);
      } else {
        this.$emit('update:modelValue', option);
      }
    },
    onRemoveSelected(option: Option) {
      const filteredOptions = this.modelValue.filter(
        (item: Option) => item.id !== option.id,
      );
      this.$emit('update:modelValue', filteredOptions);
    },
    onClear() {
      this.$emit('update:modelValue', null);
      this.$emit('dropdown:clear');
    },
    /* eslint-disable */
    scrollToOptionByIndex(index: number) {},
    /* eslint-enable */
  },
  computed: {
    computedOptions(): Option[] {
      return [];
    },
  },
});

export default eventsMixin;
