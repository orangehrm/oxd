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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RowItem = any;
