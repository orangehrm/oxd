export type WizardTab = {
  id: number;
  title: string;
  iconName?: string;
  completed?: boolean;
  clickable?: boolean;
  disabled?: boolean;
};

export type WizardEvent<T extends Event = MouseEvent> = {
  tab: WizardTab;
  event: T;
};
