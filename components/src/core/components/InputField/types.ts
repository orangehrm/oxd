export const COMPONENT_INPUT = 'oxd-input';
export const COMPONENT_FILE_INPUT = 'oxd-file-input';
export const COMPONENT_TEXTAREA = 'oxd-textarea';
export const COMPONENT_DROPDOWN_INPUT = 'oxd-dropdown-input';
export const COMPONENT_PASSWORD_INPUT = 'oxd-password-input';

export const TYPE_INPUT = 'input';
export const TYPE_FILE_INPUT = 'file';
export const TYPE_TEXTAREA = 'textarea';
export const TYPE_DROPDOWN = 'dropdown';
export const TYPE_PASSWORD = 'password';

export const TYPES = [
  TYPE_INPUT,
  TYPE_FILE_INPUT,
  TYPE_TEXTAREA,
  TYPE_DROPDOWN,
  TYPE_PASSWORD,
];

export const TYPE_MAP: TypeMap = {
  [TYPE_INPUT]: COMPONENT_INPUT,
  [TYPE_FILE_INPUT]: COMPONENT_FILE_INPUT,
  [TYPE_TEXTAREA]: COMPONENT_TEXTAREA,
  [TYPE_DROPDOWN]: COMPONENT_DROPDOWN_INPUT,
  [TYPE_PASSWORD]: COMPONENT_PASSWORD_INPUT,
};

export type Types =
  | typeof TYPE_INPUT
  | typeof TYPE_FILE_INPUT
  | typeof TYPE_TEXTAREA
  | typeof TYPE_DROPDOWN
  | typeof TYPE_PASSWORD;

export type Components =
  | typeof COMPONENT_INPUT
  | typeof COMPONENT_FILE_INPUT
  | typeof COMPONENT_TEXTAREA
  | typeof COMPONENT_DROPDOWN_INPUT
  | typeof COMPONENT_PASSWORD_INPUT;

export interface TypeMap {
  [key: string]: Components;
}
