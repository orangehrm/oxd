export const TOP = 'top';
export const BOTTOM = 'bottom';
export const LEFT = 'left';
export const RIGHT = 'right';

export interface Drawer {
  open: boolean;
  wrapperHeight: number;
  footerHeight: number;
  headerHeight: number;
}

export const POSITIONS = [TOP, BOTTOM, LEFT, RIGHT];

export type DrawerPosition =
  | typeof TOP
  | typeof BOTTOM
  | typeof LEFT
  | typeof RIGHT;
