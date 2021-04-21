export interface OutputFile extends Pick<File, 'name' | 'type' | 'size'> {
  base64: string;
}

export const LEFT = 'left';
export const RIGHT = 'right';
export const TOP = 'top';
export const BOTTOM = 'bottom';
export const LabelPositions = [LEFT, RIGHT];
export type Position = typeof LEFT | typeof RIGHT | typeof TOP | typeof BOTTOM;
