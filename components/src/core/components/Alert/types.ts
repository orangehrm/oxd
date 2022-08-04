export const TYPE_DEFAULT = 'default';
export const TYPE_SUCCESS = 'success';
export const TYPE_WARN = 'warn';
export const TYPE_ERROR = 'error';
export const TYPE_INFO = 'info';

export const TYPES = [
  TYPE_DEFAULT,
  TYPE_SUCCESS,
  TYPE_WARN,
  TYPE_ERROR,
  TYPE_INFO,
];

export const ICON_MAP = {
  [TYPE_DEFAULT]: 'star',
  [TYPE_SUCCESS]: 'check2',
  [TYPE_WARN]: 'exclamation-triangle',
  [TYPE_ERROR]: 'exclamation-circle',
  [TYPE_INFO]: 'info-circle',
};

export type AlertType =
  | typeof TYPE_DEFAULT
  | typeof TYPE_SUCCESS
  | typeof TYPE_WARN
  | typeof TYPE_ERROR
  | typeof TYPE_INFO;
