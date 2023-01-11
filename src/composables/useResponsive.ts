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

import {nextTick, onBeforeUnmount, onMounted, reactive} from 'vue';

export const DEVICE_XS = 'xs';
export const DEVICE_SM = 'sm';
export const DEVICE_MD = 'md';
export const DEVICE_LG = 'lg';
export const DEVICE_XL = 'xl';

interface Breakpoint {
  [screenType: string]: {
    min: number;
    max: number;
  };
}

export interface ResponsiveState {
  windowWidth: number;
  windowHeight: number;
  screenType: string;
}

export const breakpoints: Breakpoint = {
  [DEVICE_XS]: {
    min: 0,
    max: 599,
  },
  [DEVICE_SM]: {
    min: 600,
    max: 799,
  },
  [DEVICE_MD]: {
    min: 800,
    max: 999,
  },
  [DEVICE_LG]: {
    min: 1000,
    max: 1199,
  },
  [DEVICE_XL]: {
    min: 1200,
    max: 4000,
  },
};

export default function useResponsive() {
  const state: ResponsiveState = reactive({
    windowWidth: 0,
    windowHeight: 0,
    screenType: DEVICE_XS,
  });

  const setWindowSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    state.windowWidth = width;
    state.windowHeight = height;
    for (const screenType in breakpoints) {
      if (
        breakpoints[screenType].min <= width &&
        breakpoints[screenType].max >= width
      ) {
        state.screenType = screenType;
        break;
      }
    }
  };

  onMounted(async () => {
    await nextTick();
    setWindowSize();
    window.addEventListener('resize', setWindowSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', setWindowSize);
  });

  return state;
}
