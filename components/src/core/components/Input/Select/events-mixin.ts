import {defineComponent} from 'vue';
import {Option} from '../types';

interface State {
  dropdownOpen: boolean;
  pointer: number;
}

export const eventsMixin = defineComponent({
  props: ['modelValue', 'disabled', 'readonly', 'scrollToOption', 'options'],
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
        this.$nextTick(() => {
          const selectedIndex = this.options.findIndex(
            (option: Option) => option.id === this.modelValue.id,
          );
          if (selectedIndex !== -1) {
            this.scrollToOptionByIndex(selectedIndex);
          }
        });
      } else if (this.scrollToOption?.id) {
        this.$nextTick(() => {
          const scrollIndex = this.options.findIndex(
            (option: Option) => option.id === this.scrollToOption.id,
          );
          if (scrollIndex !== -1) {
            this.scrollToOptionByIndex(scrollIndex);
          }
        });
      }
    },
    onCloseDropdown($e: KeyboardEvent | null) {
      this.pointer = -1;
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
    scrollToView(elm: HTMLElement) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dropdown = this.$refs.dropdownRef as any;
      const dropdownInner = dropdown?.$refs?.dropdownInnerRef as HTMLElement;

      if (dropdownInner instanceof HTMLElement) {
        const optionRect = elm.getBoundingClientRect();
        const containerRect = dropdownInner.getBoundingClientRect();
        dropdownInner.scrollTop =
          dropdownInner.scrollTop + (optionRect.top - containerRect.top);
      } else if (elm && typeof elm.scrollIntoView === 'function') {
        elm.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'start',
        });
      }
    },
    scrollToOptionByIndex(index: number) {
      this.$nextTick(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let option = this.$refs[`option-${index}`] as any;
        // Handle array refs in v-for
        if (Array.isArray(option)) {
          option = option[0];
        }
        const el = option?.$el || option;
        if (el && el.scrollIntoView) {
          this.scrollToView(el);
        }
      });
    },
  },
});

export default eventsMixin;
