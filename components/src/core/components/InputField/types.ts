export const COMPONENT_INPUT = 'oxd-input';
export const COMPONENT_FILE_INPUT = 'oxd-file-input';
export const COMPONENT_TEXTAREA = 'oxd-textarea';
export const COMPONENT_DROPDOWN_INPUT = 'oxd-dropdown-input';
export const COMPONENT_PASSWORD_INPUT = 'oxd-password-input';
export const COMPONENT_CHECKBOX_INPUT = 'oxd-checkbox-input';
export const COMPONENT_SWITCH_INPUT = 'oxd-switch-input';
export const COMPONENT_RADIO_INPUT = 'oxd-radio-input';
export const COMPONENT_DATE_INPUT = 'oxd-date-input';

export const TYPE_INPUT = 'input';
export const TYPE_FILE_INPUT = 'file';
export const TYPE_TEXTAREA = 'textarea';
export const TYPE_DROPDOWN = 'dropdown';
export const TYPE_PASSWORD = 'password';
export const TYPE_CHECKBOX = 'checkbox';
export const TYPE_SWITCH = 'switch';
export const TYPE_RADIO = 'radio';
export const TYPE_DATE = 'date';

export const TYPES = [
  TYPE_INPUT,
  TYPE_FILE_INPUT,
  TYPE_TEXTAREA,
  TYPE_DROPDOWN,
  TYPE_PASSWORD,
  TYPE_CHECKBOX,
  TYPE_SWITCH,
  TYPE_RADIO,
  TYPE_DATE,
];

export const TYPE_MAP: TypeMap = {
  [TYPE_INPUT]: COMPONENT_INPUT,
  [TYPE_FILE_INPUT]: COMPONENT_FILE_INPUT,
  [TYPE_TEXTAREA]: COMPONENT_TEXTAREA,
  [TYPE_DROPDOWN]: COMPONENT_DROPDOWN_INPUT,
  [TYPE_PASSWORD]: COMPONENT_PASSWORD_INPUT,
  [TYPE_CHECKBOX]: COMPONENT_CHECKBOX_INPUT,
  [TYPE_SWITCH]: COMPONENT_SWITCH_INPUT,
  [TYPE_RADIO]: COMPONENT_RADIO_INPUT,
  [TYPE_DATE]: COMPONENT_DATE_INPUT,
};

export type Types =
  | typeof TYPE_INPUT
  | typeof TYPE_FILE_INPUT
  | typeof TYPE_TEXTAREA
  | typeof TYPE_DROPDOWN
  | typeof TYPE_PASSWORD
  | typeof TYPE_CHECKBOX
  | typeof TYPE_SWITCH
  | typeof TYPE_RADIO
  | typeof TYPE_DATE;

export type Components =
  | typeof COMPONENT_INPUT
  | typeof COMPONENT_FILE_INPUT
  | typeof COMPONENT_TEXTAREA
  | typeof COMPONENT_DROPDOWN_INPUT
  | typeof COMPONENT_PASSWORD_INPUT
  | typeof COMPONENT_CHECKBOX_INPUT
  | typeof COMPONENT_SWITCH_INPUT
  | typeof COMPONENT_RADIO_INPUT
  | typeof COMPONENT_DATE_INPUT;

export interface TypeMap {
  [key: string]: Components;
}
