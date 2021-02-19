export const SIZE_SMALL = 'small';
export const SIZE_MEDIUM = 'medium';
export const SIZE_LARGE = 'large';
export const SIZES = [SIZE_SMALL, SIZE_MEDIUM, SIZE_LARGE];

export const TYPE_MAIN = 'main';
export const TYPE_SECONDARY = 'secondary';
export const TYPE_INFO = 'info';
export const TYPE_DANGER = 'danger';
export const TYPE_WARN = 'warn';
export const TYPE_SUCCESS = 'success';

export const TYPE_GHOST = 'ghost';
export const TYPE_GHOST_INFO = 'ghost-info';
export const TYPE_GHOST_DANGER = 'ghost-danger';
export const TYPE_GHOST_WARN = 'ghost-warn';
export const TYPE_GHOST_SUCCESS = 'ghost-success';

export const TYPE_LABEL = 'label';
export const TYPE_LABEL_INFO = 'label-info';
export const TYPE_LABEL_DANGER = 'label-danger';
export const TYPE_LABEL_WARN = 'label-warn';
export const TYPE_LABEL_SUCCESS = 'label-success';

export const TYPE_TEXT = 'text';
export const TYPE_TOOL = 'tool';

export const TYPES = [
  TYPE_MAIN,
  TYPE_SECONDARY,
  TYPE_INFO,
  TYPE_DANGER,
  TYPE_WARN,
  TYPE_SUCCESS,
  TYPE_GHOST,
  TYPE_GHOST_INFO,
  TYPE_GHOST_DANGER,
  TYPE_GHOST_WARN,
  TYPE_GHOST_SUCCESS,
  TYPE_LABEL,
  TYPE_LABEL_INFO,
  TYPE_LABEL_DANGER,
  TYPE_LABEL_WARN,
  TYPE_LABEL_SUCCESS,
  TYPE_TEXT,
  TYPE_TOOL,
];

export type ButtonSize =
  | typeof SIZE_SMALL
  | typeof SIZE_MEDIUM
  | typeof SIZE_LARGE;

export type ButtonType =
  | typeof TYPE_MAIN
  | typeof TYPE_SECONDARY
  | typeof TYPE_INFO
  | typeof TYPE_DANGER
  | typeof TYPE_WARN
  | typeof TYPE_SUCCESS
  | typeof TYPE_GHOST
  | typeof TYPE_GHOST_INFO
  | typeof TYPE_GHOST_DANGER
  | typeof TYPE_GHOST_WARN
  | typeof TYPE_GHOST_SUCCESS
  | typeof TYPE_LABEL
  | typeof TYPE_LABEL_INFO
  | typeof TYPE_LABEL_DANGER
  | typeof TYPE_LABEL_WARN
  | typeof TYPE_LABEL_SUCCESS
  | typeof TYPE_TEXT
  | typeof TYPE_TOOL;
