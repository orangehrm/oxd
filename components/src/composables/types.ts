import {InjectionKey, Ref} from 'vue';

export type ErrorField = {
  cid: string;
  errors: string[];
};

export type rule = (value?: any) => string | boolean;

export type ErrorBag = Array<ErrorField>;
export type Fieldset = Array<FormField>;

export interface FormField {
  cid: Ref<string>;
  label: Ref<string>;
  dirty: Ref<boolean>;
  touched: Ref<boolean>;
  processing: Ref<boolean>;
  validate(): Promise<ErrorField>;
}

export interface FormAPI {
  searchErrors: (id: string) => ErrorField[];
  purgeErrors: (id: string) => void;
  addError: (errorField: ErrorField) => void;
  registerField: (field: FormField) => void;
  unregisterField: (field: FormField) => void;
}

export const formKey: InjectionKey<FormAPI> = Symbol('form');
