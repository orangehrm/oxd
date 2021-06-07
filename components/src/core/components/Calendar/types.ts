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

export interface DateOptions {
  selected: boolean;
  holiday?: boolean;
  highlightFull?: boolean;
  highlightHalf?: boolean;
  offset?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
