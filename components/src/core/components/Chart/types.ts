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

export type Legend = {
  enable: boolean;
  align?: 'start' | 'center' | 'end';
  fullSize?: boolean;
  position?: 'center' | 'left' | 'top' | 'right' | 'bottom' | 'chartArea';
};

export type Tooltip = {
  enable: boolean;
  position?: 'average' | 'nearest';
  titleColor?: string | null;
  backgroundColor?: string | null;
};

export type Animation = {
  enable: boolean;
  loop?: boolean;
  delay?: number;
  duration?: number;
  easing?:
    | 'linear'
    | 'easeInSine'
    | 'easeOutSine'
    | 'easeInBounce'
    | 'easeOutBounce';
};

export type DataPoint = {
  label: string;
  value: number;
  legend?: {
    enable?: boolean;
    order?: number;
    label?: string | null;
  };
  Tooltip?: {
    enable?: boolean;
    order?: number;
    label?: string | null;
  };
  color?: string | null;
};

export const COLOR_TART_ORANGE = '#FB5255';
export const COLOR_FANDANGO_PINK = '#E64980';
export const COLOR_MEDIUM_ORCHID = '#BE4BDB';
export const COLOR_MAJORELLE_BLUE = '#7A50F2';
export const COLOR_BLEU_DE_FRANCE = '#228BE6';
export const COLOR_PACIFIC_BLUE = '#0FAAC0';
export const COLOR_MOUNTAIN_MEADOW = '#12B886';
export const COLOR_YELLOW_GREEN = '#81C91D';
export const COLOR_CHROME_YELLOW = '#FFAA00';
export const COLOR_HEAT_WAVE = '#FE7D15';

export type ChartColor =
  | typeof COLOR_TART_ORANGE
  | typeof COLOR_FANDANGO_PINK
  | typeof COLOR_MEDIUM_ORCHID
  | typeof COLOR_MAJORELLE_BLUE
  | typeof COLOR_BLEU_DE_FRANCE
  | typeof COLOR_PACIFIC_BLUE
  | typeof COLOR_MOUNTAIN_MEADOW
  | typeof COLOR_YELLOW_GREEN
  | typeof COLOR_CHROME_YELLOW
  | typeof COLOR_HEAT_WAVE;
