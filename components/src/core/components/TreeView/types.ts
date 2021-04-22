export interface TNode {
  label: string;
  children: TNode[];
  [key: string]: any;
}
