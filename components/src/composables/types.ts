import {InjectionKey, Ref} from 'vue';

export type ErrorField = {
  cid: string;
  errors: string[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Rule = (value?: any) => string | boolean;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModelValue = Ref<any>;
export type Rules = Ref<Array<Rule>>;
export type Disabled = Ref<boolean>;

export type ErrorBag = Array<ErrorField>;
export type Fieldset = Array<FormField>;

export interface FormField {
  cid: Ref<string>;
  label: Ref<string>;
  dirty: Ref<boolean>;
  touched: Ref<boolean>;
  processing: Ref<boolean>;
  validate: () => Promise<ErrorField>;
  reset: () => void;
  startWatcher: () => void;
  setDirty: (value: boolean) => void;
}

export interface FormAPI {
  searchErrors: (id: string) => ErrorField[];
  purgeErrors: (id: string) => void;
  addError: (errorField: ErrorField) => void;
  registerField: (field: FormField) => void;
  unregisterField: (field: FormField) => void;
}

export const formKey: InjectionKey<FormAPI> = Symbol('form');

export interface FieldContext {
  fieldLabel: string;
  rules: Rules;
  modelValue: ModelValue;
  isDisabled: Disabled;
  isDirty: boolean;
  onReset: () => Promise<void>;
}
