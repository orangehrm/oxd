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
import {State, breakpoints, DEVICE_XS} from '../../composables/useResponsive';

export const responsiveMixin = defineComponent({
  data(): State {
    return {
      windowWidth: 0,
      windowHeight: 0,
      screenType: DEVICE_XS,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.setWindowSize);
      this.setWindowSize();
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.setWindowSize);
  },
  methods: {
    setWindowSize(): void {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      this.windowWidth = width;
      this.windowHeight = height;
      for (const screenType in breakpoints) {
        if (
          breakpoints[screenType].min <= width &&
          breakpoints[screenType].max >= width
        ) {
          this.screenType = screenType;
          break;
        }
      }
    },
  },
});

export default responsiveMixin;
