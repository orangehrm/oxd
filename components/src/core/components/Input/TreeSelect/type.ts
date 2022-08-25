export type Option = {
  id: string;
  label: string;
  children: Array<Option>;
  parentOptions: Array<Option>;
  _level: number;
  _disabled: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type OptionProp = {
  id: string;
  label: string;
  children?: Array<OptionProp>;
  _disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export interface IdsObject {
  [key: string]: boolean;
}

export const NOT_FOUND = 'NOT_FOUND';
