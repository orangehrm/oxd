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

export const SIZE_SMALL = 'small';
export const SIZE_MEDIUM = 'medium';
export const SIZE_LARGE = 'large';
export const SIZES = [SIZE_SMALL, SIZE_MEDIUM, SIZE_LARGE];

export const TYPE_MAIN = 'main';
export const TYPE_SECONDARY = 'secondary';
export const TYPE_INFO = 'info';
export const TYPE_DANGER = 'danger';
export const TYPE_WARN = 'warn';
export const TYPE_SUCCESS = 'success';

export const TYPE_SOLID = 'solid';
export const TYPE_SOLID_MAIN = 'solid-main';
export const TYPE_SOLID_SECONDARY = 'solid-secondary';
export const TYPE_SOLID_INFO = 'solid-info';
export const TYPE_SOLID_DANGER = 'solid-danger';
export const TYPE_SOLID_WARN = 'solid-warn';
export const TYPE_SOLID_SUCCESS = 'solid-success';

export const TYPE_GHOST = 'ghost';
export const TYPE_GHOST_MAIN = 'ghost-main';
export const TYPE_GHOST_INFO = 'ghost-info';
export const TYPE_GHOST_DANGER = 'ghost-danger';
export const TYPE_GHOST_WARN = 'ghost-warn';
export const TYPE_GHOST_SUCCESS = 'ghost-success';

export const TYPE_LABEL = 'label';
export const TYPE_LABEL_INFO = 'label-info';
export const TYPE_LABEL_DANGER = 'label-danger';
export const TYPE_LABEL_WARN = 'label-warn';
export const TYPE_LABEL_SUCCESS = 'label-success';

export const TYPE_TEXT = 'text';
export const TYPE_TOOL = 'tool';

export const TYPE_GLASS_VIDEO = 'videoglass';
export const TYPE_GLASS_CAMERA = 'cameraglass';
export const TYPE_GLASS_THUMBSUP = 'thumbsupglass';

export const TYPES = [
  TYPE_MAIN,
  TYPE_SECONDARY,
  TYPE_INFO,
  TYPE_DANGER,
  TYPE_WARN,
  TYPE_SUCCESS,
  TYPE_GHOST,
  TYPE_GHOST_INFO,
  TYPE_GHOST_DANGER,
  TYPE_GHOST_WARN,
  TYPE_GHOST_SUCCESS,
  TYPE_LABEL,
  TYPE_LABEL_INFO,
  TYPE_LABEL_DANGER,
  TYPE_LABEL_WARN,
  TYPE_LABEL_SUCCESS,
  TYPE_TEXT,
  TYPE_TOOL,
];

export type ButtonSize =
  | typeof SIZE_SMALL
  | typeof SIZE_MEDIUM
  | typeof SIZE_LARGE;

export type ButtonType =
  | typeof TYPE_MAIN
  | typeof TYPE_SECONDARY
  | typeof TYPE_INFO
  | typeof TYPE_DANGER
  | typeof TYPE_WARN
  | typeof TYPE_SUCCESS
  | typeof TYPE_GHOST
  | typeof TYPE_GHOST_INFO
  | typeof TYPE_GHOST_DANGER
  | typeof TYPE_GHOST_WARN
  | typeof TYPE_GHOST_SUCCESS
  | typeof TYPE_LABEL
  | typeof TYPE_LABEL_INFO
  | typeof TYPE_LABEL_DANGER
  | typeof TYPE_LABEL_WARN
  | typeof TYPE_LABEL_SUCCESS
  | typeof TYPE_TEXT
  | typeof TYPE_TOOL;

export const ICON_TYPES = [
  TYPE_MAIN,
  TYPE_SECONDARY,
  TYPE_INFO,
  TYPE_DANGER,
  TYPE_WARN,
  TYPE_SUCCESS,
  TYPE_SOLID,
  TYPE_SOLID_MAIN,
  TYPE_SOLID_INFO,
  TYPE_SOLID_DANGER,
  TYPE_SOLID_WARN,
  TYPE_SOLID_SUCCESS,
  TYPE_GHOST,
  TYPE_GHOST_MAIN,
  TYPE_GHOST_INFO,
  TYPE_GHOST_DANGER,
  TYPE_GHOST_WARN,
  TYPE_GHOST_SUCCESS,
];

export type IconType =
  | typeof TYPE_MAIN
  | typeof TYPE_SECONDARY
  | typeof TYPE_INFO
  | typeof TYPE_DANGER
  | typeof TYPE_WARN
  | typeof TYPE_SUCCESS
  | typeof TYPE_SOLID
  | typeof TYPE_SOLID_MAIN
  | typeof TYPE_SOLID_INFO
  | typeof TYPE_SOLID_DANGER
  | typeof TYPE_SOLID_SUCCESS
  | typeof TYPE_SOLID_SUCCESS
  | typeof TYPE_GHOST
  | typeof TYPE_GHOST_MAIN
  | typeof TYPE_GHOST_INFO
  | typeof TYPE_GHOST_DANGER
  | typeof TYPE_GHOST_WARN
  | typeof TYPE_GHOST_SUCCESS;

export const GLASS_ICON_TYPES = [
  TYPE_GLASS_VIDEO,
  TYPE_GLASS_CAMERA,
  TYPE_GLASS_THUMBSUP,
];

export type GlassIconType =
  | typeof TYPE_GLASS_VIDEO
  | typeof TYPE_GLASS_CAMERA
  | typeof TYPE_GLASS_THUMBSUP;
