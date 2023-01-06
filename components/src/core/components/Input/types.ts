export interface OutputFile extends Pick<File, 'name' | 'type' | 'size'> {
  base64?: string;
  fileUpdateMode?: string;
}

export const LEFT = 'left';
export const RIGHT = 'right';
export const TOP = 'top';
export const BOTTOM = 'bottom';
export const LABEL_POSITIONS = [LEFT, RIGHT];
export const DROPDOWN_POSITIONS = [TOP, BOTTOM, LEFT, RIGHT];
export type Position = typeof LEFT | typeof RIGHT | typeof TOP | typeof BOTTOM;

export const ATTACHMENT_UPDATE_MODE_KEEP = 'keep';
export const ATTACHMENT_UPDATE_MODE_REPLACE = 'replace';
export const ATTACHMENT_UPDATE_MODE_DELETE = 'delete';
export const FILE_UPDATE_MODES = [
  ATTACHMENT_UPDATE_MODE_KEEP,
  ATTACHMENT_UPDATE_MODE_REPLACE,
  ATTACHMENT_UPDATE_MODE_DELETE,
];
export type FileUpdateMode =
  | typeof ATTACHMENT_UPDATE_MODE_KEEP
  | typeof ATTACHMENT_UPDATE_MODE_REPLACE
  | typeof ATTACHMENT_UPDATE_MODE_DELETE;

export interface Option {
  id: number;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type DropdownOptions = Array<Option>;
