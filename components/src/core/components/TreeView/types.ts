export interface TNode {
  label: string;
  children: TNode[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
