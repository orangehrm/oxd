export type Option = {
  id: string;
  label: string;
  children: Array<Option>;
  parentOptions: Array<Option>;
  level: number;
  _disabled: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string | number]: any;
};

export type OptionProp = {
  id: string;
  label: string;
  children?: Array<OptionProp>;
  _disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string | number]: any;
};

export type IdsObject = {
  [key: string | number]: boolean;
};

export const NOT_FOUND = 'NOT_FOUND';
