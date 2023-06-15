export const TOP = 'top';
export const BOTTOM = 'bottom';
export const DROPDOWN_POSITIONS = [TOP, BOTTOM];
export type Position = typeof TOP | typeof BOTTOM;

export interface Option {
  context: number;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
