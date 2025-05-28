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

export const WIZARD_ICONS = {
  1: 'oxd-number-one',
  2: 'oxd-number-two',
  3: 'oxd-number-three',
  4: 'oxd-number-four',
  5: 'oxd-number-five',
  6: 'oxd-number-six',
} as const;
