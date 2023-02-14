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

export const TYPE_DEFAULT = 'default';
export const TYPE_MAIN = 'main';
export const TYPE_SECONDARY = 'secondary';
export const TYPE_SUCCESS = 'success';
export const TYPE_WARN = 'warn';
export const TYPE_ERROR = 'error';
export const TYPE_INFO = 'info';

export const TYPES = [
  TYPE_DEFAULT,
  TYPE_MAIN,
  TYPE_SECONDARY,
  TYPE_SUCCESS,
  TYPE_WARN,
  TYPE_ERROR,
  TYPE_INFO,
];

export type ProgressbarType =
  | typeof TYPE_DEFAULT
  | typeof TYPE_MAIN
  | typeof TYPE_SECONDARY
  | typeof TYPE_SUCCESS
  | typeof TYPE_WARN
  | typeof TYPE_ERROR
  | typeof TYPE_INFO;
