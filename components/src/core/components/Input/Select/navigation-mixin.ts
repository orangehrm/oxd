/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */

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
  computed: {
    computedOptions(): Option[] {
      return [];
    },
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
});

export default navigationMixin;
