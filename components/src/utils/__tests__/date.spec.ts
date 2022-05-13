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

import {convertPHPDateFormat} from '../date';

describe('components/src/utils/date::convertPHPDateFormat', () => {
  it('should convert valid php date format', () => {
    const result = convertPHPDateFormat('Y-m-d');
    expect(result).toBe('yyyy-MM-dd');
  });
  it('should convert 24h php time format', () => {
    const result = convertPHPDateFormat('H:i:s');
    expect(result).toBe('HH:mm:ss');
  });
  it('should convert 12h php time format', () => {
    const result = convertPHPDateFormat('h:i a');
    expect(result).toBe('hh:mm aaa');
  });
  it('should not convert invalid php date format', () => {
    const result = convertPHPDateFormat('pqr');
    expect(result).toBe('pqr');
  });
  it('should convert valid php date format but keep seperators', () => {
    const result = convertPHPDateFormat('Y/m/d');
    expect(result).toBe('yyyy/MM/dd');
  });
  it('should convert php ISO 8601 date format to js ISO 8601 date format', () => {
    const result = convertPHPDateFormat('c');
    expect(result).toBe("yyyy-MM-dd'T'HH:mm:ss'Z'");
  });
});
