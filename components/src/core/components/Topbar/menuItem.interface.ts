export interface TopMenuItem {
  name: string;
  url: string;
  active: boolean;
  children: SubMenuItem[];
}

export interface SubMenuItem {
  name: string;
  url: string;
}
