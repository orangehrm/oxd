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

// simplified verison from https://css-tricks.com/converting-color-spaces-in-javascript/
export const hsl2Rgb = (hsl = 'hsl(0, 0%, 100%)') => {
  const _hsl = hsl
    .substring(4)
    .split(')')[0]
    .split(',');

  let h = parseInt(_hsl[0]);
  const s = parseInt(_hsl[1].substring(0, _hsl[1].length - 1)) / 100;
  const l = parseInt(_hsl[2].substring(0, _hsl[2].length - 1)) / 100;

  if (h >= 360) h %= 360;

  const c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
};

export const hex2Hsl = (hex: string) => {
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
  // then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
};

export const hsl2Hex = (hsl: string) => {
  const [r, g, b] = hsl2Rgb(hsl);
  console.log(r, g, b);
  let _r = r.toString(16);
  let _g = g.toString(16);
  let _b = b.toString(16);

  console.log(_r, _g, _b);

  // prepend 0s if necessary
  if (_r.length == 1) _r = '0' + r;
  if (_g.length == 1) _g = '0' + g;
  if (_b.length == 1) _b = '0' + b;

  return `#${_r}${_g}${_b}`;
};
