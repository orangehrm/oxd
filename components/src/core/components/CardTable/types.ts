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

export interface SortDefinition {
  [column: string]: Order;
}
