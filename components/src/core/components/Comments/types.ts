export const AUTO = 'auto';
export const SMOOTH = 'smooth';
export const START = 'start';
export const CENTER = 'center';
export const END = 'end';
export const SCROLL_BEHAVIORS = [AUTO, SMOOTH];
export const SCROLL_POSITIONS = [START, CENTER, END];
export type Positions = typeof START | typeof CENTER | typeof END;
export type Modes = typeof AUTO | typeof SMOOTH;

export interface Scroll {
  mode: Modes;
  scrollTo: Positions;
}
