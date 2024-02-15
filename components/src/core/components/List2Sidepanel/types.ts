export type Filter = {
  label: string;
  count: string;
  color: string;
  selected?: boolean;
  backgroundColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
