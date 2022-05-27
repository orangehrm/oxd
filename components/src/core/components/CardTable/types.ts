import {Properties} from 'csstype';
import {ConcreteComponent, Directive, VNodeProps} from 'vue';
import {ActionsCellConfig, RowItem} from './Cell/types';

export interface CardHeader extends StyleProps {
  name: string;
  slot?: string;
  cellType?: string;
  cellConfig?: ActionsCellConfig<RowItem>;
  sortField?: string;
  cellRenderer?: cellRenderCallback;
}

export type cellRenderCallback = (
  index: number,
  item: RowItem,
  header: CardHeader,
  rowItems: RowItem[],
) => {
  component?: ConcreteComponent;
  props?: VNodeProps;
  directives?: Directive[];
};

export type CardHeaders = Array<CardHeader>;

export type CardSelector = StyleProps;

export interface StyleProps {
  style?: StyleAttribute;
  class?: ClassAttribute;
}

export type ClassAttribute = ObjectClass | ArrayClass;

export interface ObjectClass {
  [key: string]: boolean;
}

export type ArrayClass = Array<ObjectClass | string>;

export type StyleAttribute = Properties;

export type Order = 'ASC' | 'DESC' | 'DEFAULT';

export interface SortObject {
  order: string;
  iconAsc: string;
  iconDesc: string;
}

export interface SortDefinition {
  [column: string]: SortObject;
}

export const HIGHLIGHT_TYPE_SUCCESS = 'success';
export const HIGHLIGHT_TYPE_WARN = 'warn';
export const HIGHLIGHT_TYPE_ERROR = 'error';
export const HIGHLIGHT_TYPE_INFO = 'info';

export const HIGHLIGHT_TYPES = [
  HIGHLIGHT_TYPE_SUCCESS,
  HIGHLIGHT_TYPE_WARN,
  HIGHLIGHT_TYPE_ERROR,
  HIGHLIGHT_TYPE_INFO,
];

export type HighlightType =
  | typeof HIGHLIGHT_TYPE_SUCCESS
  | typeof HIGHLIGHT_TYPE_WARN
  | typeof HIGHLIGHT_TYPE_ERROR
  | typeof HIGHLIGHT_TYPE_INFO;

export interface HighlightRows {
  rowIndexes: number[];
  type: string;
}
