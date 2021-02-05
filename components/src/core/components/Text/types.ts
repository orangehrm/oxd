export const TAG_H1 = 'h1';
export const TAG_H2 = 'h2';
export const TAG_H3 = 'h3';
export const TAG_H4 = 'h4';
export const TAG_H5 = 'h5';
export const TAG_H6 = 'h6';
export const TAG_P = 'p';
export const TAG_SPAN = 'span';
export const TAGS = [
  TAG_H1,
  TAG_H2,
  TAG_H3,
  TAG_H4,
  TAG_H5,
  TAG_H6,
  TAG_P,
  TAG_SPAN,
];

export type Tags =
  | typeof TAG_H1
  | typeof TAG_H2
  | typeof TAG_H3
  | typeof TAG_H4
  | typeof TAG_H5
  | typeof TAG_H6
  | typeof TAG_P
  | typeof TAG_SPAN;
