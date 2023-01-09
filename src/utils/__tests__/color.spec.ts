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

import {
  clamp,
  hex2Hsv,
  hex2Rgb,
  hsv2Hex,
  hsv2Rgb,
  rgb2Hex,
  rgb2Hsv,
  sanitizeHex,
  generateRandomColor,
} from '../color';
import {describe, it, expect} from 'vitest';

describe('components/src/utils/color::sanitizeHex', () => {
  it('should accept valid 6 digit Hex', () => {
    const result = sanitizeHex('#ff0000');
    expect(result).toBe('#ff0000');
  });
  it('should accept valid 3 digit Hex', () => {
    const result = sanitizeHex('#f00');
    expect(result).toBe('#ff0000');
  });
  it('should accept valid Hex with alpha', () => {
    const result = sanitizeHex('#ff000080');
    expect(result).toBe('#ff0000');
  });
  it('should not accept invalid 6 digit Hex', () => {
    const result = sanitizeHex('#ffx000');
    expect(result).toBe(null);
  });
  it('should not accept invalid 3 digit Hex', () => {
    const result = sanitizeHex('#ffx');
    expect(result).toBe(null);
  });
  it('should not accept non Hex string', () => {
    const result = sanitizeHex('car');
    expect(result).toBe(null);
  });
});

describe('components/src/utils/color::hex2Hsv', () => {
  it('should accept valid hex', () => {
    const result = hex2Hsv('#ff0000');
    expect(result).toStrictEqual([0, 1, 1]);
  });
  it('should not accept invalid hex', () => {
    const result = hex2Hsv('#ffxx00');
    expect(result).toStrictEqual([NaN, NaN, NaN]);
  });
});

describe('components/src/utils/color::hsv2Hex', () => {
  it('should accept hue, sat, value', () => {
    expect(hsv2Hex(0, 0, 0)).toStrictEqual('#000000');
    expect(hsv2Hex(0, 1, 0)).toStrictEqual('#000000');
    expect(hsv2Hex(0, 1, 1)).toStrictEqual('#ff0000');
    expect(hsv2Hex(150, 1, 0.5)).toStrictEqual('#008040');
  });
});

describe('components/src/utils/color::rgb2Hsv', () => {
  it('should accept red, green, blue', () => {
    expect(rgb2Hsv(255, 0, 0)).toStrictEqual([0, 1, 1]);
    expect(rgb2Hsv(0, 255, 0)).toStrictEqual([120, 1, 1]);
    expect(rgb2Hsv(0, 0, 255)).toStrictEqual([240, 1, 1]);
  });
});

describe('components/src/utils/color::hsv2Rgb', () => {
  it('should accept hue, sat, value', () => {
    expect(hsv2Rgb(0, 1, 1)).toStrictEqual([255, 0, 0]);
    expect(hsv2Rgb(120, 1, 1)).toStrictEqual([0, 255, 0]);
    expect(hsv2Rgb(240, 1, 1)).toStrictEqual([0, 0, 255]);
  });
});

describe('components/src/utils/color::hex2Rgb', () => {
  it('should accept valid 6 digit Hex', () => {
    const result = hex2Rgb('#ff0000');
    expect(result).toStrictEqual([255, 0, 0]);
  });
  it('should accept valid 3 digit Hex', () => {
    const result = hex2Rgb('#f00');
    expect(result).toStrictEqual([255, 0, 0]);
  });
  it('should not accept non Hex string', () => {
    const result = hex2Rgb('car');
    expect(result).toStrictEqual([0, 0, 0]);
  });
});

describe('components/src/utils/color::rgb2Hex', () => {
  it('should accept red, green, blue', () => {
    expect(rgb2Hex(255, 0, 0)).toStrictEqual('#ff0000');
    expect(rgb2Hex(0, 255, 0)).toStrictEqual('#00ff00');
    expect(rgb2Hex(0, 0, 255)).toStrictEqual('#0000ff');
    expect(rgb2Hex(0, 0, 0)).toStrictEqual('#000000');
  });
});

describe('components/src/utils/color::clamp', () => {
  it('should clamp number between 0 - 1', () => {
    expect(clamp(-1, 0, 1)).toStrictEqual(0);
    expect(clamp(0, 0, 1)).toStrictEqual(0);
    expect(clamp(0.5, 0, 1)).toStrictEqual(0.5);
    expect(clamp(1, 0, 1)).toStrictEqual(1);
    expect(clamp(50, 0, 1)).toStrictEqual(1);
  });
});

describe('components/src/utils/color::generateRandomColor', () => {
  it('should generate valid hex', () => {
    const result = generateRandomColor();
    expect(/^#[0-9A-F]{6}$/i.test(result)).toBeTruthy();
  });
});
