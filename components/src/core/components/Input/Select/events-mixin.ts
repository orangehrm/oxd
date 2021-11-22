import {defineComponent} from 'vue';
import {Option} from '../types';

interface State {
  dropdownOpen: boolean;
  pointer: number;
}

export const eventsMixin = defineComponent({
  props: ['modelValue', 'disabled'],
  data(): State {
    return {
      dropdownOpen: false,
      pointer: -1,
    };
  },
  methods: {
    onOpenDropdown() {
      if (this.disabled || this.dropdownOpen) return;
      this.dropdownOpen = true;
      this.$emit('dropdown:opened');
    },
    onCloseDropdown() {
      if (this.disabled || !this.dropdownOpen) return;
      this.dropdownOpen = false;
      this.$emit('dropdown:closed');
    },
    onToggleDropdown() {
      if (!this.dropdownOpen) {
        this.onOpenDropdown()
      } else {
        this.onCloseDropdown()
      }
    },
    onBlur() {
      this.onCloseDropdown();
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
  },
});

export default eventsMixin;
