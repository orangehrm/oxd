import {isSame, isAfter, isBefore, parseDate, compareTime} from '../utils/date';

/**
 * @param {string|number|Array} value
 * @returns {boolean|string}
 */
export const required = function(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: string | number | Array<any>,
): boolean | string {
  if (typeof value === 'string') {
    return (!!value && value.trim() !== '') || 'Required';
  } else if (typeof value === 'number') {
    return !Number.isNaN(value) || 'Required';
  } else if (Array.isArray(value)) {
    return (!!value && value.length !== 0) || 'Required';
  } else if (typeof value === 'object') {
    return value !== null || 'Required';
  } else if (typeof value === 'boolean') {
    return value || 'Required';
  } else {
    return 'Required';
  }
};

/**
 * @param {number} charLength
 */
export const shouldNotExceedCharLength = function(charLength: number) {
  return function(value: string): boolean | string {
    return (
      !value ||
      new String(value).length <= charLength ||
      `Should not exceed ${charLength} characters`
    );
  };
};

export const validDateFormat = function(dateFormat = 'yyyy-MM-dd') {
  return function(value: string): boolean | string {
    if (!value) return true;
    const parsed = parseDate(value, dateFormat);
    return parsed ? true : `Should be a valid date in ${dateFormat} format`;
  };
};

export const validTimeFormat = function(value: string): boolean | string {
  if (!value) return true;
  const parsed = parseDate(value, 'HH:mm');
  return parsed ? true : `Should be a valid time in hh:mm a format`;
};

export const max = function(maxValue: number) {
  return function(value: string): boolean | string {
    return (
      Number.isNaN(parseFloat(value)) ||
      parseFloat(value) < maxValue ||
      `Should be less than ${maxValue}`
    );
  };
};

export const digitsOnly = function(value: string): boolean | string {
  return (
    value == '' ||
    (/^\d+$/.test(value) && !Number.isNaN(parseFloat(value))) ||
    'Should be a number'
  );
};

/**
 * Check whether date1 is before date2
 * @param {string} date1
 * @param {string} date2
 * @param {string} dateFormat
 */
export const beforeDate = function(
  date1: string,
  date2: string,
  dateFormat = 'yyyy-MM-dd',
) {
  // Skip assertion on unset values
  if (!date1 || !date2) {
    return true;
  }
  return isBefore(date1, date2, dateFormat);
};

/**
 * Check whether date1 is after date2
 * @param {string} date1
 * @param {string} date2
 * @param {string} dateFormat
 */
export const afterDate = function(
  date1: string,
  date2: string,
  dateFormat = 'yyyy-MM-dd',
) {
  // Skip assertion on unset values
  if (!date1 || !date2) {
    return true;
  }
  return isAfter(date1, date2, dateFormat);
};

/**
 * Check whether date1 is same as date2
 * @param {string} date1
 * @param {string} date2
 * @param {string} dateFormat
 */
export const sameDate = function(
  date1: string,
  date2: string,
  dateFormat = 'yyyy-MM-dd',
) {
  // Skip assertion on unset values
  if (!date1 || !date2) {
    return true;
  }
  return isSame(date1, date2, dateFormat);
};

/**
 * @param {string} startDate
 * @param {string|undefined} message
 * @param {object} options
 */
export const endDateShouldBeAfterStartDate = (
  startDate: string | Function,
  message?: string,
  options: {
    allowSameDate?: boolean;
    dateFormat?: string;
  } = {
    allowSameDate: false,
    dateFormat: 'yyyy-MM-dd',
  },
) => {
  return (value: string): boolean | string => {
    const resolvedStartDate =
      typeof startDate === 'function' ? startDate() : startDate;
    const resolvedMessage =
      typeof message === 'string'
        ? message
        : 'End date should be after start date';
    if (options.allowSameDate) {
      return (
        sameDate(value, resolvedStartDate) ||
        afterDate(value, resolvedStartDate, options.dateFormat) ||
        resolvedMessage
      );
    } else {
      return (
        afterDate(value, resolvedStartDate, options.dateFormat) ||
        resolvedMessage
      );
    }
  };
};

/**
 * Check whether time1 is before time2
 * @param {string} time1
 * @param {string} time2
 * @param {string} timeFormat
 */
export const beforeTime = function(
  time1: string,
  time2: string,
  timeFormat = 'yyyy-MM-dd',
) {
  // Skip assertion on unset values
  if (!time1 || !time2) {
    return true;
  }
  return compareTime(time1, time2, timeFormat) === 1;
};

/**
 * Check whether time1 is after time2
 * @param {string} time1
 * @param {string} time2
 * @param {string} timeFormat
 */
export const afterTime = function(
  time1: string,
  time2: string,
  timeFormat = 'HH:mm',
) {
  // Skip assertion on unset values
  if (!time1 || !time2) {
    return true;
  }
  return compareTime(time1, time2, timeFormat) === -1;
};

/**
 * Check whether time1 is equal time2
 * @param {string} time1
 * @param {string} time2
 * @param {string} timeFormat
 */
export const sameTime = function(
  time1: string,
  time2: string,
  timeFormat = 'HH:mm',
) {
  // Skip assertion on unset values
  if (!time1 || !time2) {
    return true;
  }
  return compareTime(time1, time2, timeFormat) === 0;
};

/**
 * @param {string} startTime
 * @param {string|undefined} message
 * @param {object} options
 */
export const endTimeShouldBeAfterStartTime = (
  startTime: string | Function,
  message?: string,
  options: {
    allowSameTime?: boolean;
    timeFormat?: string;
  } = {
    allowSameTime: false,
    timeFormat: 'HH:mm',
  },
) => {
  return (value: string): boolean | string => {
    const resolvedStartTime =
      typeof startTime === 'function' ? startTime() : startTime;
    const resolvedMessage =
      typeof message === 'string'
        ? message
        : 'End time should be after start time';
    if (options.allowSameTime) {
      return (
        sameTime(value, resolvedStartTime) ||
        afterTime(value, resolvedStartTime, options.timeFormat) ||
        resolvedMessage
      );
    } else {
      return (
        afterTime(value, resolvedStartTime, options.timeFormat) ||
        resolvedMessage
      );
    }
  };
};

/**
 * @param {number} size - File size in bytes
 */
export const maxFileSize = function(size: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function(file: any): boolean | string {
    if (file === null || file === undefined) return true;
    if (Array.isArray(file)) {
      if (!file.find(_file => _file.size > size)) return true;
    } else if (file.size && file.size <= size) {
      return true;
    }
    return 'Attachment size exceeded';
  };
};

export const validFileTypes = function(fileTypes: string[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function(file: any): boolean | string {
    if (file === null || file === undefined) return true;
    if (Array.isArray(file)) {
      if (
        !file.find(
          _file => fileTypes.findIndex(item => item === _file.type) === -1,
        )
      )
        return true;
    } else if (file && fileTypes.findIndex(item => item === file.type) > -1) {
      return true;
    }
    return 'File type not allowed';
  };
};

export const validEmailFormat = function(value: string): boolean | string {
  return (
    !value ||
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)+$/.test(
      value,
    ) ||
    'Expected format: admin@example.com'
  );
};

export const validPhoneNumberFormat = function(
  value: string,
): boolean | string {
  return (
    !value ||
    /^[0-9+\-/()]+$/.test(value) ||
    'Allows numbers and only + - / ( )'
  );
};

export const validURLFormat = function(value: string): boolean | string {
  return (
    !value ||
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value,
    ) ||
    'Should be a valid url'
  );
};

/**
 * @param {string} endDate
 * @param {string|undefined} message
 * @param {object} options
 */
export const startDateShouldBeBeforeEndDate = (
  endDate: string | Function,
  message?: string,
  options: {
    allowSameDate?: boolean;
    dateFormat?: string;
  } = {
    allowSameDate: false,
    dateFormat: 'yyyy-MM-dd',
  },
) => {
  return (value: string): boolean | string => {
    const resolvedEndDate = typeof endDate === 'function' ? endDate() : endDate;
    const resolvedMessage =
      typeof message === 'string'
        ? message
        : 'Start date should be before end date';
    if (options.allowSameDate) {
      return (
        sameDate(value, resolvedEndDate) ||
        beforeDate(value, resolvedEndDate, options.dateFormat) ||
        resolvedMessage
      );
    } else {
      return (
        beforeDate(value, resolvedEndDate, options.dateFormat) ||
        resolvedMessage
      );
    }
  };
};

export const maxCurrency = function(maxValue: number) {
  return function(value: string): boolean | string {
    return (
      Number.isNaN(parseFloat(value)) ||
      parseFloat(value) < maxValue ||
      `Should be less than ${maxValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
    );
  };
};

/**
 * @param {string} endTime
 * @param {string|undefined} message
 * @param {object} options
 */
export const startTimeShouldBeBeforeEndTime = (
  endTime: string | Function,
  message?: string,
  options: {
    allowSameTime?: boolean;
    timeFormat?: string;
  } = {
    allowSameTime: false,
    timeFormat: 'HH:mm',
  },
) => {
  return (value: string): boolean | string => {
    const resolvedEndTime = typeof endTime === 'function' ? endTime() : endTime;
    const resolvedMessage =
      typeof message === 'string'
        ? message
        : 'Start time should be before end time';
    if (options.allowSameTime) {
      return (
        sameTime(value, resolvedEndTime) ||
        beforeTime(value, resolvedEndTime, options.timeFormat) ||
        resolvedMessage
      );
    } else {
      return (
        beforeTime(value, resolvedEndTime, options.timeFormat) ||
        resolvedMessage
      );
    }
  };
};

/**
 * @param {number} charLength
 */
export const shouldNotLessThanCharLength = function(charLength: number) {
  return function(value: string): boolean | string {
    return (
      !value ||
      String(value).length >= charLength ||
      `Should be least  ${charLength} characters`
    );
  };
};

/**
 * @param {string | function} minValue
 * @param {string|undefined} message
 */
export const maxValueShouldBeGreaterThanMinValue = (
  minValue: string | Function,
  message?: string,
) => {
  return (value: string): boolean | string => {
    const resolvedMinValue =
      typeof minValue === 'function' ? minValue() : minValue;
    const resolvedMessage =
      typeof message === 'string'
        ? message
        : 'Should be higher than Minimum Value';
    if (resolvedMinValue === null || value === null) return true;
    if (resolvedMinValue === undefined || value === undefined) return true;
    if (resolvedMinValue === '' || value === '') return true;
    if (resolvedMinValue === '0' || value === '0') return true;
    return parseFloat(resolvedMinValue) < parseFloat(value) || resolvedMessage;
  };
};

/**
 * @param {string | function} maxValue
 * @param {string|undefined} message
 */
export const minValueShouldBeLowerThanMaxValue = (
  maxValue: string | Function,
  message?: string,
) => {
  return (value: string): boolean | string => {
    const resolvedMaxValue =
      typeof maxValue === 'function' ? maxValue() : maxValue;
    const resolvedMessage =
      typeof message === 'string'
        ? message
        : 'Should be lower than Maximum value';
    if (resolvedMaxValue === null || value === null) return true;
    if (resolvedMaxValue === undefined || value === undefined) return true;
    if (resolvedMaxValue === '' || value === '0') return true;
    return parseFloat(resolvedMaxValue) > parseFloat(value) || resolvedMessage;
  };
};

/**
 * @param {number} minValue
 * @param {number} maxValue
 * @param {string|undefined} message
 */
export const numberShouldBeBetweenMinandMaxValue = (
  minValue: number,
  maxValue: number,
  message?: string,
) => {
  return (value: string): boolean | string => {
    const resolvedMessage =
      typeof message === 'string'
        ? message
        : `Should be a number between ${minValue}-${maxValue}`;
    return (
      (digitsOnly(value) === true &&
        parseFloat(value) >= minValue &&
        parseFloat(value) <= maxValue) ||
      resolvedMessage
    );
  };
};
