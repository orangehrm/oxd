/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */

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
