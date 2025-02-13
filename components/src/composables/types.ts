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
  fieldName: string;
  rules: Rules;
  modelValue: ModelValue;
  isDisabled: Disabled;
  isDirty: boolean;
  onReset: () => Promise<void>;
}

export interface FieldProperties {
  cid: string;
  label: string;
  name: string;
  dirty: boolean;
  touched: boolean;
}

export interface ValidationHookContext {
  onValidationError?: (
    modelValue: ModelValue,
    errors: string[],
    field: FieldProperties,
  ) => void | Promise<void>;
  onValidationComplete?: (
    modelValue: ModelValue,
    result: ErrorField,
    field: FieldProperties,
  ) => void | Promise<void>;
  onValidationStart?: (
    modelValue: ModelValue,
    field: FieldProperties,
  ) => void | Promise<void>;
  onSuccessfulValidation?: (
    modelValue: ModelValue,
    field: FieldProperties,
  ) => void | Promise<void>;
  onFieldRegister?: (field: FieldProperties) => void | Promise<void>;
  onFieldUnregister?: (field: FieldProperties) => void | Promise<void>;
}

export type ValidationHookSet = Set<ValidationHookContext>;
export const validationHookKey: InjectionKey<ValidationHookSet> = Symbol(
  'vhooks',
);
