import {Properties} from 'csstype';
import {ActionsCellConfig, RowItem} from './Cell/types';

export interface CardHeader extends StyleProps {
  name: string;
  cellType?: string;
  cellConfig?: ActionsCellConfig<RowItem>;
}

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
