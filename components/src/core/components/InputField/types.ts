export const COMPONENT_INPUT = 'oxd-input';
export const COMPONENT_FILE_INPUT = 'oxd-file-input';
export const COMPONENT_TEXTAREA = 'oxd-textarea';
export const COMPONENT_PASSWORD_INPUT = 'oxd-password-input';
export const COMPONENT_CHECKBOX_INPUT = 'oxd-checkbox-input';
export const COMPONENT_SWITCH_INPUT = 'oxd-switch-input';
export const COMPONENT_RADIO_INPUT = 'oxd-radio-input';
export const COMPONENT_DATE_INPUT = 'oxd-date-input';
export const COMPONENT_AUTOCOMPLETE_INPUT = 'oxd-autocomplete-input';
export const COMPONENT_QUICKSEARCH_INPUT = 'oxd-quicksearch-input';
export const COMPONENT_SELECT_INPUT = 'oxd-select-input';
export const COMPONENT_MULTISELECT_INPUT = 'oxd-multiselect-input';
export const COMPONENT_TIME_INPUT = 'oxd-time-input';
export const COMPONENT_CHECKBOXGROUP_INPUT = 'oxd-checkboxgroup-input';
export const COMPONENT_INFOBOX = 'oxd-infobox';
export const COMPONENT_COMMENTS = 'oxd-comments';
export const COMPONENT_RADIO_PILL_GROUP = 'oxd-radio-pill-group';
export const COMPONENT_TREESELECT_INPUT = 'oxd-tree-select-input';
export const COMPONENT_RADIOGROUP_INPUT = 'oxd-radiogroup-input';
export const COMPONENT_TINYMCE_INPUT = 'oxd-tinymce';
export const COMPONENT_NUMBER_INPUT = 'oxd-number-input';

export const TYPE_INPUT = 'input';
export const TYPE_FILE_INPUT = 'file';
export const TYPE_TEXTAREA = 'textarea';
export const TYPE_PASSWORD = 'password';
export const TYPE_CHECKBOX = 'checkbox';
export const TYPE_SWITCH = 'switch';
export const TYPE_RADIO = 'radio';
export const TYPE_DATE = 'date';
export const TYPE_AUTOCOMPLETE = 'autocomplete';
export const TYPE_QUICKSEARCH = 'quicksearch';
export const TYPE_SELECT = 'select';
export const TYPE_MULTISELECT = 'multiselect';
export const TYPE_TIME = 'time';
export const TYPE_CHECKBOXGROUP = 'checkboxgroup';
export const TYPE_INFOBOX = 'infobox';
export const TYPE_COMMENTS = 'comments';
export const TYPE_RADIO_PILL_GROUP = 'radiopillgroup';
export const TYPE_TREE_SELECT = 'treeselect';
export const TYPE_RADIOGROUP = 'radiogroup';
export const TYPE_TINYMCE = 'tinymce';
export const TYPE_NUMBER = 'number';

export const HINT_PLACEMENT_TOP = 'top';
export const HINT_PLACEMENT_BOTTOM = 'bottom';

export const TYPES = [
  TYPE_INPUT,
  TYPE_FILE_INPUT,
  TYPE_TEXTAREA,
  TYPE_PASSWORD,
  TYPE_CHECKBOX,
  TYPE_SWITCH,
  TYPE_RADIO,
  TYPE_DATE,
  TYPE_AUTOCOMPLETE,
  TYPE_QUICKSEARCH,
  TYPE_SELECT,
  TYPE_MULTISELECT,
  TYPE_TIME,
  TYPE_CHECKBOXGROUP,
  TYPE_INFOBOX,
  TYPE_COMMENTS,
  TYPE_RADIO_PILL_GROUP,
  TYPE_TREE_SELECT,
  TYPE_RADIOGROUP,
  TYPE_TINYMCE,
  TYPE_NUMBER,
];

export const TYPE_MAP: TypeMap<Components> = {
  [TYPE_INPUT]: COMPONENT_INPUT,
  [TYPE_FILE_INPUT]: COMPONENT_FILE_INPUT,
  [TYPE_TEXTAREA]: COMPONENT_TEXTAREA,
  [TYPE_PASSWORD]: COMPONENT_PASSWORD_INPUT,
  [TYPE_CHECKBOX]: COMPONENT_CHECKBOX_INPUT,
  [TYPE_SWITCH]: COMPONENT_SWITCH_INPUT,
  [TYPE_RADIO]: COMPONENT_RADIO_INPUT,
  [TYPE_DATE]: COMPONENT_DATE_INPUT,
  [TYPE_AUTOCOMPLETE]: COMPONENT_AUTOCOMPLETE_INPUT,
  [TYPE_QUICKSEARCH]: COMPONENT_QUICKSEARCH_INPUT,
  [TYPE_SELECT]: COMPONENT_SELECT_INPUT,
  [TYPE_MULTISELECT]: COMPONENT_MULTISELECT_INPUT,
  [TYPE_TIME]: COMPONENT_TIME_INPUT,
  [TYPE_CHECKBOXGROUP]: COMPONENT_CHECKBOXGROUP_INPUT,
  [TYPE_INFOBOX]: COMPONENT_INFOBOX,
  [TYPE_COMMENTS]: COMPONENT_COMMENTS,
  [TYPE_RADIO_PILL_GROUP]: COMPONENT_RADIO_PILL_GROUP,
  [TYPE_TREE_SELECT]: COMPONENT_TREESELECT_INPUT,
  [TYPE_RADIOGROUP]: COMPONENT_RADIOGROUP_INPUT,
  [TYPE_TINYMCE]: COMPONENT_TINYMCE_INPUT,
  [TYPE_NUMBER]: COMPONENT_NUMBER_INPUT,
};

export type Types =
  | typeof TYPE_INPUT
  | typeof TYPE_FILE_INPUT
  | typeof TYPE_TEXTAREA
  | typeof TYPE_PASSWORD
  | typeof TYPE_CHECKBOX
  | typeof TYPE_SWITCH
  | typeof TYPE_RADIO
  | typeof TYPE_DATE
  | typeof TYPE_AUTOCOMPLETE
  | typeof TYPE_SELECT
  | typeof TYPE_MULTISELECT
  | typeof TYPE_TIME
  | typeof TYPE_CHECKBOXGROUP
  | typeof TYPE_INFOBOX
  | typeof TYPE_TREE_SELECT
  | typeof TYPE_COMMENTS
  | typeof TYPE_RADIO_PILL_GROUP
  | typeof TYPE_RADIOGROUP
  | typeof TYPE_TINYMCE
  | typeof TYPE_NUMBER;

export type Components =
  | typeof COMPONENT_INPUT
  | typeof COMPONENT_FILE_INPUT
  | typeof COMPONENT_TEXTAREA
  | typeof COMPONENT_PASSWORD_INPUT
  | typeof COMPONENT_CHECKBOX_INPUT
  | typeof COMPONENT_SWITCH_INPUT
  | typeof COMPONENT_RADIO_INPUT
  | typeof COMPONENT_DATE_INPUT
  | typeof COMPONENT_AUTOCOMPLETE_INPUT
  | typeof COMPONENT_QUICKSEARCH_INPUT
  | typeof COMPONENT_SELECT_INPUT
  | typeof COMPONENT_MULTISELECT_INPUT
  | typeof COMPONENT_TIME_INPUT
  | typeof COMPONENT_CHECKBOXGROUP_INPUT
  | typeof COMPONENT_INFOBOX
  | typeof COMPONENT_TREESELECT_INPUT
  | typeof COMPONENT_COMMENTS
  | typeof COMPONENT_RADIO_PILL_GROUP
  | typeof COMPONENT_RADIOGROUP_INPUT
  | typeof COMPONENT_TINYMCE_INPUT
  | typeof COMPONENT_NUMBER_INPUT;

export interface TypeMap<T> {
  [key: string]: T;
}

export type HintPlacements =
  | typeof HINT_PLACEMENT_TOP
  | typeof HINT_PLACEMENT_BOTTOM;
