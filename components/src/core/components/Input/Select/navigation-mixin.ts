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
  data(): State {
    return {
      dropdownOpen: false,
      pointer: -1,
    };
  },
  methods: {
    onSelectDown() {
      if (this.dropdownOpen) {
        if (this.computedOptions.length - 1 > this.pointer) {
          this.pointer++;
        } else {
          this.pointer = this.computedOptions.length - 1;
        }
      }
    },
    onSelectUp() {
      if (this.dropdownOpen) {
        if (this.pointer > 0) {
          this.pointer--;
        } else {
          this.pointer = 0;
        }
      }
    },
    onSelectEnter() {
      if (!this.dropdownOpen) {
        this.openDropdown();
      } else {
        if (this.pointer > 0) {
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
      const filtered = this.computedOptions.flatMap((item: Option, i: number) =>
        item.label.toLowerCase().startsWith($e.key) ? i : [],
      );
      if (filtered.length > 0) {
        this.pointer = cycleIndexes(this.pointer, filtered);
      }
    },
    /* eslint-disable */
    openDropdown() {},
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
