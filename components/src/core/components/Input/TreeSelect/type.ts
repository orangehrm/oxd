export type Option = {
  id: string;
  label: string;
  children: Array<Option>;
  parentOptions: Array<Option>;
  level: number;
  _disabled: boolean;

  [key: string | number]: any;
};

export type OptionProp = {
  id: string;
  label: string;
  children?: Array<OptionProp>;

  [key: string | number]: any;
};

export type SelectedIdsObject = {
  [key: string | number]: boolean;
};
