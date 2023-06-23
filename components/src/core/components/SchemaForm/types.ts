import {ConcreteComponent, HTMLAttributes, VNode} from 'vue';
import {TypeMap, Types} from '../InputField/types';

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

type LayoutType =
  | typeof TYPE_GRID
  | typeof TYPE_ACTION
  | typeof TYPE_DIVIDER
  | typeof TYPE_CUSTOM;

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
type Model = {[key: string]: any};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Validator = (value: any) => boolean | string | Promise<boolean | string>;

type CommonSchemaProperties = {
  id?: HTMLAttributes['id'];
  key?: string;
  style?: HTMLAttributes['style'];
  class?: HTMLAttributes['class'];
};

type ComponentSchemaProperties<T> = {
  type: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: ConcreteComponent<any>;
  props?: Props;
};

type FieldType = Types | typeof TYPE_BUTTON | typeof TYPE_CUSTOM;

type EventListeners = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ($event: Event, data: any) => void;
};

type FieldSchema = CommonSchemaProperties &
  ComponentSchemaProperties<FieldType> & {
    name: string;
    label: string;
    hint?: string;
    value?: string | number | object | unknown;
    placeholder?: string;
    visible?: boolean;
    hook?: (schema: FieldSchema, model: object) => FieldSchema;
    validators?: Map<string, Validator>;
    listeners?: EventListeners;
    dirty?: boolean;
  };

type LayoutChild = {
  [slot: string]: Array<FieldSchema>;
};

type LayoutSchema = CommonSchemaProperties &
  ComponentSchemaProperties<LayoutType> & {
    children?: LayoutChild | Array<string> | Array<VNode>;
  };

type FormSchema = CommonSchemaProperties & {
  layout: Array<LayoutSchema>;
  name: string;
  disabled?: boolean;
};

export {
  Props,
  Model,
  FieldType,
  LayoutType,
  LayoutChild,
  FormSchema,
  FieldSchema,
  LayoutSchema,
  LayoutComponent,
  LAYOUT_TYPE_MAP,
  CommonSchemaProperties,
  ComponentSchemaProperties,
};
