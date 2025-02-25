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
  modelName: string;
  modelValue: ModelValue;
  rules: Rules;
  isDisabled: Ref<boolean>;
  isDirty: boolean;
  onReset: () => void;
  getSnapshot?: unknown;
}

export interface FieldProperties {
  cid: string;
  label: string;
  dirty: boolean;
  touched: boolean;
  modelName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue: any;
}

export interface ValidationHookContext {
  onValidationError?: (
    field: FieldProperties,
    errors: string[],
  ) => void | Promise<void>;
  onValidationComplete?: (
    field: FieldProperties,
    result: ErrorField,
  ) => void | Promise<void>;
  onValidationStart?: (field: FieldProperties) => void | Promise<void>;
  onSuccessfulValidation?: (field: FieldProperties) => void | Promise<void>;
  onFieldRegister?: (field: FieldProperties) => void | Promise<void>;
  onFieldUnregister?: (field: FieldProperties) => void | Promise<void>;
}

export type ValidationHookSet = Set<ValidationHookContext>;
export const validationHookKey: InjectionKey<ValidationHookSet> = Symbol(
  'vhooks',
);

export interface FieldState {
  cid: string;
  label: string;
  dirty: boolean;
  touched: boolean;
  modelName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue: any;
  processing: boolean;
}

export type CustomSnapshotFn = (state: FieldState) => FieldProperties;
