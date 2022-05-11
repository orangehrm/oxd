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

/**
 * Clamp value between min and max amount
 * @param value
 * @param min
 * @param max
 * @returns {number}
 */
export const clamp = (value: number, min: number, max: number) => {
  // return Math.max(min, Math.min(value, max));
  return Math.max(0, Math.min(1, value - min / max - min));
};

// simplified verison from https://css-tricks.com/converting-color-spaces-in-javascript/

/**
 * Convert RGB to Hex color
 * @param red Value between [0-255]
 * @param green Value between [0-255]
 * @param blue Value between [0-255]
 * @returns {string} Hex string
 */
export const rgb2Hex = (red: number, green: number, blue: number): string => {
  let _r = red.toString(16);
  let _g = green.toString(16);
  let _b = blue.toString(16);

  // prepend 0s if necessary
  if (_r.length === 1) _r = '0' + _r;
  if (_g.length === 1) _g = '0' + _g;
  if (_b.length === 1) _b = '0' + _b;

  return `#${_r}${_g}${_b}`;
};

/**
 * Convert Hex color to RGB
 * @param hex Hex color code
 * @returns {Array<number>} Array containing red, green, blue values [0-255]
 */
export const hex2Rgb = (hex: string) => {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length == 4) {
    r = parseInt(`0x${hex[1]}${hex[1]}`);
    g = parseInt(`0x${hex[2]}${hex[2]}`);
    b = parseInt(`0x${hex[3]}${hex[3]}`);
  } else if (hex.length == 7) {
    r = parseInt(`0x${hex[1]}${hex[2]}`);
    g = parseInt(`0x${hex[3]}${hex[4]}`);
    b = parseInt(`0x${hex[5]}${hex[6]}`);
  }

  return [r, g, b];
};

/**
 * Convert HSV color to RGB
 * @param hue Hue in degrees (0-360)
 * @param sat Staturation (0-1)
 * @param val Value (0-1)
 * @returns {Array<number>} Array containing red, green, blue values [0-255]
 */
export const hsv2Rgb = (hue: number, sat: number, val: number) => {
  const f = (n: number, k = (n + hue / 60) % 6) =>
    val - val * sat * Math.max(Math.min(k, 4 - k, 1), 0);
  return [
    Math.round(f(5) * 255),
    Math.round(f(3) * 255),
    Math.round(f(1) * 255),
  ];
};

/**
 * Convert RGB to HSV color
 * @param red Value between [0-255]
 * @param green Value between [0-255]
 * @param blue Value between [0-255]
 * @returns {Array<number>} Array containing hue[0-360], saturation[0-1], value [0-1]
 */
export const rgb2Hsv = (red: number, green: number, blue: number) => {
  red = clamp(red / 255, 0, 1);
  green = clamp(green / 255, 0, 1);
  blue = clamp(blue / 255, 0, 1);
  const v = Math.max(red, green, blue);
  const c = v - Math.min(red, green, blue);
  const h =
    c &&
    (v == red
      ? (green - blue) / c
      : v == green
      ? 2 + (blue - red) / c
      : 4 + (red - green) / c);
  return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
};

/**
 * Convert HSV color to HEX
 * @param hue Hue in degrees (0-360)
 * @param sat Staturation (0-1)
 * @param val Value (0-1)
 * @returns {string} Hex color code
 */
export const hsv2Hex = (hue: number, sat: number, val: number) => {
  const [r, g, b] = hsv2Rgb(hue, sat, val);
  return rgb2Hex(r, g, b);
};

/**
 * Convert HEX to HSV color
 * @param hex hex code
 * @returns {Array<number>} Array containing hue[0-360], saturation[0-1], value [0-1]
 */
export const hex2Hsv = (hex: string) => {
  const [r, g, b] = hex2Rgb(hex);
  return rgb2Hsv(r, g, b);
};

/**
 * Validate and sanitize hex color codes
 * @param hex Hex color code
 * @returns {string|null}
 */
export const sanitizeHex = (hex: string | null) => {
  if (!hex) return null;
  if (hex.substring(0, 1) === '#') hex = hex.substring(1);
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(_hex => _hex + _hex)
      .join('');
  }
  if (hex.length > 6) hex = hex.substring(0, 5);
  return /^[0-9A-F]{6}$/i.test(hex) ? `#${hex}` : null;
};
