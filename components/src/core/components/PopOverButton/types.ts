export const TOP = 'top';
export const BOTTOM = 'bottom';
export const LEFT = 'left';
export const RIGHT = 'right';
export const CENTER = 'center';
export const DROPDOWN_POSITIONS = [TOP, BOTTOM];
export const DROPDOWN_ALIGHMENT = [LEFT, RIGHT, CENTER];
export type Position = typeof TOP | typeof BOTTOM;
export type DropdownAlignment = typeof LEFT | typeof RIGHT | typeof CENTER;

export interface Option {
  context: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
