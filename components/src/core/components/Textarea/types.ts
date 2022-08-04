export const RESIZE_NONE = 'none';
export const RESIZE_VERTICAL = 'vertical';
export const RESIZE_HORIZONTAL = 'horizontal';

export type TextareaResize =
  | typeof RESIZE_NONE
  | typeof RESIZE_VERTICAL
  | typeof RESIZE_HORIZONTAL;
