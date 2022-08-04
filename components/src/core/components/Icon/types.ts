export const ICON_SIZE_XXX_SMALL = 'xxx-small';
export const ICON_SIZE_XX_SMALL = 'xx-small';
export const ICON_SIZE_EXTRA_SMALL = 'extra-small';
export const ICON_SIZE_SMALL = 'small';
export const ICON_SIZE_MEDIUM = 'medium';
export const ICON_SIZE_LARGE = 'large';
export const ICON_SIZE_EXTRA_LARGE = 'extra-large';
export const ICON_SIZES = [
  ICON_SIZE_XXX_SMALL,
  ICON_SIZE_XX_SMALL,
  ICON_SIZE_EXTRA_SMALL,
  ICON_SIZE_SMALL,
  ICON_SIZE_MEDIUM,
  ICON_SIZE_LARGE,
  ICON_SIZE_EXTRA_LARGE,
];

export type IconSize =
  | typeof ICON_SIZE_XXX_SMALL
  | typeof ICON_SIZE_XX_SMALL
  | typeof ICON_SIZE_EXTRA_SMALL
  | typeof ICON_SIZE_SMALL
  | typeof ICON_SIZE_MEDIUM
  | typeof ICON_SIZE_LARGE
  | typeof ICON_SIZE_EXTRA_LARGE;

export const TOP_LEFT = 'top-left';
export const TOP_RIGHT = 'top-right';
export const BOTTOM_LEFT = 'bottom-left';
export const BOTTOM_RIGHT = 'bottom-right';

export const HELP_POSITIONS = [TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT];

export type HelpPosition =
  | typeof TOP_LEFT
  | typeof TOP_RIGHT
  | typeof BOTTOM_LEFT
  | typeof BOTTOM_RIGHT;
