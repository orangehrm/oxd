import {defineComponent} from 'vue';
import {Option} from '../types';

interface State {
  dropdownOpen: boolean;
  searchTerm: string | null;
  pointer: number;
  options: Option[];
}

export const eventsMixin = defineComponent({
  props: ['modelValue', 'disabled', 'multiple'],
  data(): State {
    return {
      dropdownOpen: false,
      searchTerm: null,
      pointer: -1,
      options: [],
    };
  },
  methods: {
    onOpenDropdown() {
      if (this.disabled && this.dropdownOpen) return;
      this.dropdownOpen = true;
      this.$emit('dropdown:opened');
    },
    onCloseDropdown() {
      if (this.disabled && !this.dropdownOpen) return;
      this.dropdownOpen = false;
      this.$emit('dropdown:closed');
    },
    onBlur() {
      this.onCloseDropdown();
      this.$emit('dropdown:blur');
    },
    onSelect(option: Option) {
      this.searchTerm = null;
      this.pointer = -1;
      this.dropdownOpen = false;
      if (this.multiple) {
        const prevSelected = Array.isArray(this.modelValue)
          ? this.modelValue
          : [];
        this.$emit('update:modelValue', [...prevSelected, option]);
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
  },
});

export default eventsMixin;
