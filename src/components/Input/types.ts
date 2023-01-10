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

export interface OutputFile extends Pick<File, 'name' | 'type' | 'size'> {
  base64: string;
}

export const LEFT = 'left';
export const RIGHT = 'right';
export const TOP = 'top';
export const BOTTOM = 'bottom';
export const LABEL_POSITIONS = [LEFT, RIGHT];
export const DROPDOWN_POSITIONS = [TOP, BOTTOM];
export const COLOR_DROPDOWN_POSITIONS = [LEFT, RIGHT];
export type Position = typeof LEFT | typeof RIGHT | typeof TOP | typeof BOTTOM;

export interface Option {
  id: number;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type DropdownOptions = Array<Option>;
