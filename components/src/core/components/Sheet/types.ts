export const TYPE_GRAY_DARKEN_2 = 'gray-darken-2';
export const TYPE_GRAY_DARKEN_1 = 'gray-darken-1';
export const TYPE_GRAY = 'gray';
export const TYPE_GRAY_LIGHTEN_1 = 'gray-lighten-1';
export const TYPE_GRAY_LIGHTEN_2 = 'gray-lighten-2';
export const TYPE_LIGHT_GRAY = 'light-gray';
export const TYPE_PASTEL_WHITE = 'pastel-white';
export const TYPE_WHITE_SHADOW = 'white-shadow';
export const TYPE_WHITE = 'white';

export const TYPES = [
  TYPE_GRAY_DARKEN_2,
  TYPE_GRAY_DARKEN_1,
  TYPE_GRAY,
  TYPE_GRAY_LIGHTEN_1,
  TYPE_GRAY_LIGHTEN_2,
  TYPE_LIGHT_GRAY,
  TYPE_PASTEL_WHITE,
  TYPE_WHITE_SHADOW,
  TYPE_WHITE,
];

export type SheetType =
  | typeof TYPE_GRAY_DARKEN_2
  | typeof TYPE_GRAY_DARKEN_1
  | typeof TYPE_GRAY
  | typeof TYPE_GRAY_LIGHTEN_1
  | typeof TYPE_GRAY_LIGHTEN_2
  | typeof TYPE_LIGHT_GRAY
  | typeof TYPE_PASTEL_WHITE
  | typeof TYPE_WHITE_SHADOW
  | typeof TYPE_WHITE;
