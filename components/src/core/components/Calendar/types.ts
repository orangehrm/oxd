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

export const DATE_FORMAT_1 = 'yyyy-MM-dd';
export const DATE_FORMAT_2 = 'dd-MM-yyyy';
export const DATE_FORMAT_3 = 'MM-dd-yyyy';
export const DATE_FORMAT_4 = 'dd-yyyy-MM';
export const DATE_FORMAT_5 = 'yyyy-dd-MM';
export const DATE_FORMAT_6 = 'MM-yyyy-dd';
export const DATE_FORMAT_7 = 'yyyy/MM/dd';
export const DATE_FORMAT_8 = 'yyyy-MM-dd';
export const DATE_FORMAT_9 = 'yyyy-MMM-dd';
export const DATE_FORMAT_10 = 'EEEE, dd-MMM-yyyy';
export const DATE_FORMAT_11 = 'EEE, dd MMM yyyy';

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

export const LENGTHY_DATE_FORMATS = [
  DATE_FORMAT_10,
  DATE_FORMAT_11,
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
