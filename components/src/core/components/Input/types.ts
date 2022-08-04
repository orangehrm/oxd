export interface OutputFile extends Pick<File, 'name' | 'type' | 'size'> {
  base64?: string;
}

export const LEFT = 'left';
export const RIGHT = 'right';
export const TOP = 'top';
export const BOTTOM = 'bottom';
export const LABEL_POSITIONS = [LEFT, RIGHT];
export const DROPDOWN_POSITIONS = [TOP, BOTTOM, LEFT, RIGHT];
export type Position = typeof LEFT | typeof RIGHT | typeof TOP | typeof BOTTOM;

export interface Option {
  id: number;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type DropdownOptions = Array<Option>;
