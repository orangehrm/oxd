import {defineComponent} from 'vue';
import {Option} from '../types';

interface State {
  dropdownOpen: boolean;
  pointer: number;
  options: Option[];
}

export const navigationMixin = defineComponent({
  data(): State {
    return {
      dropdownOpen: false,
      pointer: -1,
      options: [],
    };
  },
  methods: {
    onSelectDown() {
      if (this.dropdownOpen) {
        if (this.options.length > this.pointer) {
          this.pointer++;
        } else {
          this.pointer = this.options.length;
        }
      }
    },
    onSelectUp() {
      if (this.dropdownOpen) {
        if (this.pointer > -1) {
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
          this.onSelect(this.options[this.pointer]);
        }
      }
    },
    openDropdown() {},
    onSelect(option: Option) {},
  },
});

export default navigationMixin;
