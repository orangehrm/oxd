export const SIZE_SMALL = 'small';
export const SIZE_MEDIUM = 'medium';
export const SIZE_LARGE = 'large';
export const SIZES = [SIZE_SMALL, SIZE_MEDIUM, SIZE_LARGE];

export const TYPE_MAIN = 'main';
export const TYPE_SECONDARY = 'secondary';
export const TYPE_GHOST = 'ghost';
export const TYPE_LABEL = 'label';
export const TYPE_LABEL_ERROR = 'label-error';

export const TYPES = [
  TYPE_MAIN,
  TYPE_SECONDARY,
  TYPE_GHOST,
  TYPE_LABEL,
  TYPE_LABEL_ERROR,
];

export type ButtonSize =
  | typeof SIZE_SMALL
  | typeof SIZE_MEDIUM
  | typeof SIZE_LARGE;

export type ButtonType =
  | typeof TYPE_MAIN
  | typeof TYPE_SECONDARY
  | typeof TYPE_GHOST
  | typeof TYPE_LABEL
  | typeof TYPE_LABEL_ERROR;
