import {
  isDate,
  parse,
  format,
  isEqual,
  isWeekend,
  getDaysInMonth,
  getYear,
  getMonth,
  getDay,
} from 'date-fns';

const freshDate = () => {
  return new Date(new Date().setHours(0, 0, 0, 0));
};

const parseDate = (value: any, format: string): Date | null => {
  try {
    if (typeof value === 'string' && value) {
      return parse(value, format, freshDate());
    } else if (isDate(value)) {
      return value as Date;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const getDayOffset = (date: Date, weekStartsOn: number) => {
  const week = [0, 1, 2, 3, 4, 5, 6];
  return (
    week
      .splice(weekStartsOn, 6)
      .concat(week)
      .findIndex(i => i === getDay(date)) + 1
  );
};

export {
  isDate,
  parse,
  format,
  isEqual,
  isWeekend,
  getDaysInMonth,
  getYear,
  getMonth,
  getDayOffset,
  freshDate,
  parseDate,
};
