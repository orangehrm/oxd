export const SIZE_EXRTA_SMALL = 'small';
export const SIZE_SMALL = 'small';
export const SIZE_MEDIUM = 'medium';

export const SIZES = [SIZE_EXRTA_SMALL, SIZE_SMALL, SIZE_MEDIUM];

export type ImageSize =
  | typeof SIZE_EXRTA_SMALL
  | typeof SIZE_SMALL
  | typeof SIZE_MEDIUM;

export const TARGET_SELF = '_self';
export const TARGET_BLANK = '_blank';
export const TARGET_PARENT = '_parent';
export const TARGET_TOP = '_top';

export const TARGETS = [TARGET_SELF, TARGET_BLANK, TARGET_PARENT, TARGET_TOP];

export type TargetTypes =
  | typeof TARGET_SELF
  | typeof TARGET_BLANK
  | typeof TARGET_PARENT
  | typeof TARGET_TOP;
