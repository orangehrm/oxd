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

const parseDate = (value: string, dateFormat: string): Date | null => {
  try {
    const parsed = parse(value, dateFormat.replace(/'/g, ''), freshDate());
    return !isNaN(parsed.valueOf()) ? parsed : null;
  } catch (error) {
    return null;
  }
};

const formatDate = (value: Date, dateFormat: string): string | null => {
  try {
    return format(value, dateFormat.replace(/'/g, ''));
  } catch (error) {
    return '';
  }
};

const rearrangeWeek = (weekStartsOn: number) => {
  const week = [0, 1, 2, 3, 4, 5, 6];
  return week.splice(weekStartsOn, 6).concat(week);
};

const getDayOffset = (date: Date, weekStartsOn: number) => {
  return rearrangeWeek(weekStartsOn).findIndex(i => i === getDay(date)) + 1;
};

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
};
