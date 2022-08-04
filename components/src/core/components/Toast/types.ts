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

export const POSITION_TOP = 'top';
export const POSITION_BOTTOM = 'bottom';

export const POSITIONS = [POSITION_TOP, POSITION_BOTTOM];

export const ICON_MAP = {
  [TYPE_DEFAULT]: 'star',
  [TYPE_SUCCESS]: 'check2',
  [TYPE_WARN]: 'exclamation-triangle',
  [TYPE_ERROR]: 'exclamation-circle',
  [TYPE_INFO]: 'info-circle',
};

export type ToastType =
  | typeof TYPE_DEFAULT
  | typeof TYPE_SUCCESS
  | typeof TYPE_WARN
  | typeof TYPE_ERROR
  | typeof TYPE_INFO;

export type ToastContainerPositions =
  | typeof POSITION_TOP
  | typeof POSITION_BOTTOM;

export interface Toast {
  type: ToastType;
  title: string;
  message?: string;
  show: boolean;
  persistent?: boolean;
}
