import {VNodeProps} from 'vue';

export interface ActionsCellConfig<T> {
  [key: string]: Action<T>;
}

export type ActionsCellConfigOnEventFunction<T> = (
  rowItem: T,
  e: Event,
) => void;

export interface Action<T> {
  onClick?: ActionsCellConfigOnEventFunction<T>;
  onChange?: ActionsCellConfigOnEventFunction<T>;
  component?: string;
  props?: VNodeProps;
}

export interface RowItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  isSelectable?: boolean;
  isDisabled?: boolean;
}

export interface ActionCellEvent extends MouseEvent {
  context?: string;
}

export type DropdownOption = {
  label: string;
  context: string;
  count?: string;
  icon?: string;
};

export interface ProfilePicItem {
  profilePic?: string | null;
  size?: string | null;
}

export const TARGET_SELF = '_self';
export const TARGET_BLANK = '_blank';
export const TARGET_PARENT = '_parent';
export const TARGET_TOP = '_top';

export const TARGETS = [TARGET_SELF, TARGET_BLANK, TARGET_PARENT, TARGET_TOP];

export type TargetTypes =
  | typeof TARGET_SELF
  | typeof TARGET_BLANK
  | typeof TARGET_PARENT
  | typeof TARGET_TOP;
