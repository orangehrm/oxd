export interface State {
  hour: string;
  minute: string;
  period?: string;
}

export interface TimeInputState {
  time: string;
  pickerInput: string | null;
  am?: boolean;
}

export const INPUT_TIME_FORMAT_12 = '12';
export const INPUT_TIME_FORMAT_24 = '24';

export const INPUT_TIME_FORMATS = [INPUT_TIME_FORMAT_12, INPUT_TIME_FORMAT_24];
export type InputTimeFormat =
  | typeof INPUT_TIME_FORMAT_12
  | typeof INPUT_TIME_FORMAT_24;

export const TIME_FORMAT_24_HR = 'HH:mm';
export const TIME_FORMAT_12_HR = 'hh:mm';
export const TIME_FORMAT_12_HR_WITH_PERIOD = 'hh:mm a';

export const VALID_TIME_FORMAT_12 = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
export const VALID_TIME_FORMAT_24 = /^((0?|1)[0-9]|2[0-3]):[0-5][0-9]$/;

export const TIME_PERIOD_AM = 'AM';
export const TIME_PERIOD_PM = 'PM';
