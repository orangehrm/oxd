export const COMPONENT_INPUT = 'oxd-input';
export const COMPONENT_FILE_INPUT = 'oxd-file-input';
export const COMPONENT_TEXTAREA = 'oxd-textarea';

export const TYPE_INPUT = 'input';
export const TYPE_FILE_INPUT = 'file';
export const TYPE_TEXTAREA = 'textarea';

export const TYPES = [TYPE_INPUT, TYPE_FILE_INPUT, TYPE_TEXTAREA];
export const TYPE_MAP: TypeMap = {
  [TYPE_INPUT]: COMPONENT_INPUT,
  [TYPE_FILE_INPUT]: COMPONENT_FILE_INPUT,
  [TYPE_TEXTAREA]: COMPONENT_TEXTAREA,
};

export type Types =
  | typeof TYPE_INPUT
  | typeof TYPE_FILE_INPUT
  | typeof TYPE_TEXTAREA;

export type Components =
  | typeof COMPONENT_INPUT
  | typeof COMPONENT_FILE_INPUT
  | typeof COMPONENT_TEXTAREA;

export interface TypeMap {
  [key: string]: Components;
}
