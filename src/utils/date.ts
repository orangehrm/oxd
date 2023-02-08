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
  parse,
  format,
  isDate,
  isEqual,
  isWeekend,
  getDaysInMonth,
  getYear,
  getMonth,
  getDay,
  nextSaturday,
  nextSunday,
} from 'date-fns';

const freshDate = () => {
  return new Date(new Date().setHours(0, 0, 0, 0));
};

const parseDate = (
  value: string,
  dateFormat: string,
  options = {},
): Date | null => {
  try {
    const parsed = parse(
      value,
      dateFormat.replace(/'/g, ''),
      freshDate(),
      options,
    );
    if (!isNaN(parsed.valueOf()) && parsed.getFullYear() >= 1000) {
      return parsed;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const formatDate = (
  value: Date,
  dateFormat: string,
  options = {},
): string | null => {
  try {
    return format(value, dateFormat.replace(/'/g, ''), options);
  } catch (error) {
    return '';
  }
};

const rearrangeWeek = (weekStartsOn: number) => {
  const week = [0, 1, 2, 3, 4, 5, 6];
  return week.splice(weekStartsOn, 6).concat(week);
};

const getDayOffset = (date: Date, weekStartsOn: number) => {
  return rearrangeWeek(weekStartsOn).findIndex((i) => i === getDay(date)) + 1;
};

/**
 * convertPHPDateFormat will return format string matching with
 * date-fns library. see https://date-fns.org/v2.28.0/docs/Unicode-Tokens
 * @param {string} format PHP-style date format string
 * @returns {string}
 */
function convertPHPDateFormat(format: string) {
  return format
    .split('')
    .map((token: string) => {
      let convertedToken = '';
      switch (token) {
        case 'j': // Day of the month without leading zeros  (1 to 31)
          convertedToken = 'd';
          break;

        case 'd': // Day of the month, 2 digits with leading zeros (01 to 31)
          convertedToken = 'dd';
          break;

        case 'l': // (lowercase 'L') A full textual representation of the day of the week
          convertedToken = 'EEEE';
          break;

        case 'w': // Numeric representation of the day of the week (0=Sunday,1=Monday,...6=Saturday)
          convertedToken = 'i';
          break;

        case 'D': // A textual representation of a day, three letters
          convertedToken = 'EEE';
          break;

        case 'm': // Numeric representation of a month, with leading zeros (01 to 12)
          convertedToken = 'MM';
          break;

        case 'n': // Numeric representation of a month, without leading zeros (1 to 12)
          convertedToken = 'M';
          break;

        case 'F': // A full textual representation of a month, such as January or March
          convertedToken = 'MMMM';
          break;

        case 'M': // A short textual representation of a month, three letters (Jan - Dec)
          convertedToken = 'MMM';
          break;

        case 'Y': // A full numeric representation of a year, 4 digits (1999 OR 2003)
          convertedToken = 'yyyy';
          break;

        case 'y': // A two digit representation of a year (99 OR 03)
          convertedToken = 'yy';
          break;

        case 'H': // 24-hour format of an hour with leading zeros (00 to 23)
          convertedToken = 'HH';
          break;

        case 'g': // 12-hour format of an hour without leading zeros (1 to 12)
          convertedToken = 'h';
          break;

        case 'h': // 12-hour format of an hour with leading zeros (01 to 12)
          convertedToken = 'hh';
          break;

        case 'a': // Lowercase Ante meridiem and Post meridiem (am or pm)
          convertedToken = 'aaa';
          break;

        case 'i': // Minutes with leading zeros (00 to 59)
          convertedToken = 'mm';
          break;

        case 's': // Seconds, with leading zeros (00 to 59)
          convertedToken = 'ss';
          break;

        case 'c': // ISO 8601 date (eg: 2012-11-20T18:05:54.944Z)
          convertedToken = "yyyy-MM-dd'T'HH:mm:ss'Z'";
          break;

        default:
          convertedToken = token;
      }
      return convertedToken;
    })
    .join('');
}

export {
  isDate,
  isEqual,
  isWeekend,
  getDaysInMonth,
  getYear,
  getMonth,
  getDayOffset,
  freshDate,
  parseDate,
  formatDate,
  rearrangeWeek,
  nextSaturday,
  nextSunday,
  convertPHPDateFormat,
};
