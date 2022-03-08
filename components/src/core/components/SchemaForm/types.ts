import {Component, HTMLAttributes} from 'vue';
import {
  TypeMap,
  Types as FieldType,
  TYPE_MAP as FIELD_TYPE_MAP,
  Components as FieldComponents,
} from '../InputField/types';

const TYPE_CUSTOM = 'custom';
const TYPE_BUTTON = 'button';

// Layout types
const TYPE_GRID = 'grid';
const TYPE_ACTION = 'action';
const TYPE_DIVIDER = 'divider';

// Layout component types
const COMPONENT_GRID = 'oxd-grid';
const COMPONENT_DIVIDER = 'oxd-divider';
const COMPONENT_ACTIONS = 'oxd-form-actions';

type LayoutType = typeof TYPE_GRID | typeof TYPE_ACTION | typeof TYPE_DIVIDER;

type LayoutComponent =
  | typeof COMPONENT_GRID
  | typeof COMPONENT_DIVIDER
  | typeof COMPONENT_ACTIONS;

const LAYOUT_TYPE_MAP: TypeMap<LayoutComponent> = {
  [TYPE_GRID]: COMPONENT_GRID,
  [TYPE_ACTION]: COMPONENT_ACTIONS,
  [TYPE_DIVIDER]: COMPONENT_DIVIDER,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Validator = (value: any) => boolean | string;

type FieldSchema<T = object> = {
  id?: HTMLAttributes['id'];
  name: string;
  label: string;
  type: FieldType | typeof TYPE_CUSTOM;
  component?: Component;
  props?: Props;
  value?: string | number | T | Array<T>;
  placeholder?: string;
  visible?: boolean;
  required?: boolean | Validator;
  style?: HTMLAttributes['style'];
  class?: HTMLAttributes['class'];
  hook?: (schema: FieldSchema, model: object) => FieldSchema;
  validators?: Array<Validator>;
};

type LayoutChild = {
  slot?: string;
  fields: Array<FieldSchema>;
};

type LayoutSchema = {
  id?: HTMLAttributes['id'];
  style?: HTMLAttributes['style'];
  class?: HTMLAttributes['class'];
  type: LayoutType | typeof TYPE_CUSTOM;
  component?: Component;
  props?: Props;
  children?: Array<LayoutChild>;
};

type FormSchema = {
  id?: HTMLAttributes['id'];
  style?: HTMLAttributes['style'];
  class?: HTMLAttributes['class'];
  layout: Array<LayoutSchema>;
};

export {
  FieldType,
  LayoutType,
  FormSchema,
  FieldSchema,
  LayoutSchema,
  LayoutComponent,
  FieldComponents,
  FIELD_TYPE_MAP,
  LAYOUT_TYPE_MAP,
};
