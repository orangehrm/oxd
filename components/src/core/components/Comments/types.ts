export const AUTO = 'auto';
export const SMOOTH = 'smooth';
export const START = 'start';
export const END = 'end';
export const SCROLL_BEHAVIORS = [AUTO, SMOOTH];
export const SCROLL_POSITIONS = [START, END];
export const GROUP_BY_TYPE_NONE = 'none';
export const GROUP_BY_TYPE_GROUP = 'group';
export type Positions = typeof START | typeof END;
export type Modes = typeof AUTO | typeof SMOOTH;
export type GroupBy = typeof GROUP_BY_TYPE_NONE | typeof GROUP_BY_TYPE_GROUP;
export interface Scroll {
  mode: Modes;
  scrollTo: Positions;
}
