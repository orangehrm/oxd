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
    return null;
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
};
