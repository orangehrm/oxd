import {defineComponent} from 'vue';
import {Option} from '../types';

interface State {
  dropdownOpen: boolean;
  pointer: number;
}

const cycleIndexes = (currentValue: number, array: number[]) => {
  const currentIndex = array.indexOf(currentValue);
  return array[(currentIndex + 1) % array.length];
};

export const navigationMixin = defineComponent({
  props: ['disabled', 'readonly'],
  data(): State {
    return {
      dropdownOpen: false,
      pointer: -1,
    };
  },
  methods: {
    onSelectDown() {
      if (this.dropdownOpen) {
        const originalPointer = this.pointer;
        do {
          this.pointer++;
        } while (
          this.pointer < this.computedOptions.length &&
          this.computedOptions[this.pointer]._disabled
        );

        if (this.pointer >= this.computedOptions.length) {
          this.pointer = originalPointer;
        }
      }
    },
    onSelectUp() {
      if (this.dropdownOpen) {
        const originalPointer = this.pointer;
        do {
          this.pointer--;
        } while (
          this.pointer >= 0 &&
          this.computedOptions[this.pointer]._disabled
        );

        if (this.pointer < 0) {
          this.pointer = originalPointer;
        }
      }
    },
    onSelectEnter() {
      if (!this.dropdownOpen) {
        this.openDropdown();
      } else {
        if (this.pointer >= 0) {
          const option = this.computedOptions[this.pointer];
          if (!option?._selected && !option?._disabled) this.onSelect(option);
        }
      }
    },
    scrollToView(elm: HTMLElement) {
      elm.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    },
    onKeypress($e: KeyboardEvent) {
      if ($e.key.length > 1) return; // Filter one letter keypress only
      if (this.disabled || this.readonly) return;
      const filtered = this.computedOptions.flatMap((item: Option, i: number) =>
        item.label.toLowerCase().startsWith($e.key) && !item._disabled ? i : [],
      );
      if (filtered.length > 0) {
        this.pointer = cycleIndexes(this.pointer, filtered);
        const option = this.computedOptions[this.pointer];
        if (!option?._selected && !option?._disabled) this.onSelect(option);
      }
    },

    openDropdown() {
      if (this.disabled || this.readonly || this.dropdownOpen) return;
      this.dropdownOpen = true;
      this.$emit('dropdown:opened');
    },
    /* eslint-disable */
    onSelect(option: Option) {},
    /* eslint-enable */
  },
  computed: {
    computedOptions(): Option[] {
      return [];
    },
  },
});

export default navigationMixin;
