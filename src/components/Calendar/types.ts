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

export const SUNDAY = 'S';
export const MONDAY = 'M';
export const TUESDAY = 'T';
export const WEDNESDAY = 'W';
export const THURSDAY = 'T';
export const FRIDAY = 'F';
export const SATURDAY = 'S';

export const JANUARY = 'January';
export const FEBRUARY = 'February';
export const MARCH = 'March';
export const APRIL = 'April';
export const MAY = 'May';
export const JUNE = 'June';
export const JULY = 'July';
export const AUGUST = 'August';
export const SEPTEMBER = 'September';
export const OCTOBER = 'October';
export const NOVEMBER = 'November';
export const DECEMBER = 'December';

export const DAYS_OF_WEEK = [
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
];

export const MONTHS_OF_YEAR = [
  JANUARY,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER,
];

export type CalendarEvent = {
  date: Date;
  type: string;
  class?: string;
  style?: object;
};

export interface CalendarDayAttributes {
  index: number;
  class?: string;
  style?: object;
}
