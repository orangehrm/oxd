import {VNodeProps} from 'vue';

export interface ActionsCellConfig<T> {
  [key: string]: Action<T>;
}

export type ActionsCellConfigOnClickFunction<T> = (
  rowItem: T,
  e: Event,
) => void;

export interface Action<T> {
  onClick?: ActionsCellConfigOnClickFunction<T>;
  component?: string;
  props?: VNodeProps;
}

export interface RowItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  isSelectable?: boolean;
  isDisabled?: boolean;
}
