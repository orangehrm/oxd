export const SIZE_SMALL = 'small';
export const SIZE_MEDIUM = 'medium';
export const SIZE_LARGE = 'large';
export const SIZE_LONG = 'long';
export const SIZES = [SIZE_SMALL, SIZE_MEDIUM, SIZE_LARGE, SIZE_LONG];

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

export const TYPE_LABEL_FEEDBACK = 'label-feedback';
export const TYPE_LABEL_FEEDBACK_INFO = 'label-feedback-info';
export const TYPE_LABEL_FEEDBACK_DANGER = 'label-feedback-danger';
export const TYPE_LABEL_FEEDBACK_WARN = 'label-feedback-warn';
export const TYPE_LABEL_FEEDBACK_SUCCESS = 'label-feedback-success';
export const TYPE_LABEL_FEEDBACK_REJECT = 'label-feedback-reject';

export const TYPE_TEXT = 'text';
export const TYPE_TOOL = 'tool';

export const TYPE_GLASS = 'glass';

export const TOOLTIP_TOP = 'top';
export const TOOLTIP_BOTTOM = 'bottom';
export const TOOLTIP_LEFT = 'left';
export const TOOLTIP_RIGHT = 'right';

export const TOOLTIP_POSITIONS = [
  TOOLTIP_TOP,
  TOOLTIP_BOTTOM,
  TOOLTIP_LEFT,
  TOOLTIP_RIGHT,
];

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
  TYPE_LABEL_FEEDBACK,
  TYPE_LABEL_FEEDBACK_INFO,
  TYPE_LABEL_FEEDBACK_DANGER,
  TYPE_LABEL_FEEDBACK_WARN,
  TYPE_LABEL_FEEDBACK_SUCCESS,
  TYPE_LABEL_FEEDBACK_REJECT,
  TYPE_TEXT,
  TYPE_TOOL,
  TYPE_GLASS,
];

export type ButtonSize =
  | typeof SIZE_SMALL
  | typeof SIZE_MEDIUM
  | typeof SIZE_LARGE
  | typeof SIZE_LONG;

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
  | typeof TYPE_LABEL_FEEDBACK
  | typeof TYPE_LABEL_FEEDBACK_INFO
  | typeof TYPE_LABEL_FEEDBACK_DANGER
  | typeof TYPE_LABEL_FEEDBACK_WARN
  | typeof TYPE_LABEL_FEEDBACK_SUCCESS
  | typeof TYPE_LABEL_FEEDBACK_REJECT
  | typeof TYPE_TEXT
  | typeof TYPE_TOOL;

export type TooltipPosition =
  | typeof TOOLTIP_TOP
  | typeof TOOLTIP_BOTTOM
  | typeof TOOLTIP_LEFT
  | typeof TOOLTIP_RIGHT;
