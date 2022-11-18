export type Legend = {
  enable: boolean;
  align?: 'start' | 'center' | 'end';
  fullSize?: boolean;
  position?: 'center' | 'left' | 'top' | 'right' | 'bottom' | 'chartArea';
};

export type Tooltip = {
  enable: boolean;
  position?: 'average' | 'nearest';
  titleColor?: string | null;
  backgroundColor?: string | null;
};

export type Animation = {
  enable: boolean;
  loop?: boolean;
  delay?: number;
  duration?: number;
  easing?:
    | 'linear'
    | 'easeInSine'
    | 'easeOutSine'
    | 'easeInBounce'
    | 'easeOutBounce';
};

export type DataPoint = {
  label: string;
  value: number;
  color: string;
  legend?: {
    enable?: boolean;
    order?: number;
    label?: string | null;
  };
  Tooltip?: {
    enable?: boolean;
    order?: number;
    label?: string | null;
  };
};

export const COLOR_TART_ORANGE = '#FB5255';
export const COLOR_FANDANGO_PINK = '#E64980';
export const COLOR_MEDIUM_ORCHID = '#BE4BDB';
export const COLOR_MAJORELLE_BLUE = '#7A50F2';
export const COLOR_BLEU_DE_FRANCE = '#228BE6';
export const COLOR_PACIFIC_BLUE = '#0FAAC0';
export const COLOR_MOUNTAIN_MEADOW = '#12B886';
export const COLOR_YELLOW_GREEN = '#81C91D';
export const COLOR_CHROME_YELLOW = '#FFAA00';
export const COLOR_HEAT_WAVE = '#FE7D15';

export type ChartColor =
  | typeof COLOR_TART_ORANGE
  | typeof COLOR_FANDANGO_PINK
  | typeof COLOR_MEDIUM_ORCHID
  | typeof COLOR_MAJORELLE_BLUE
  | typeof COLOR_BLEU_DE_FRANCE
  | typeof COLOR_PACIFIC_BLUE
  | typeof COLOR_MOUNTAIN_MEADOW
  | typeof COLOR_YELLOW_GREEN
  | typeof COLOR_CHROME_YELLOW
  | typeof COLOR_HEAT_WAVE;

export const CHART_COLORS = {
  COLOR_TART_ORANGE,
  COLOR_FANDANGO_PINK,
  COLOR_MEDIUM_ORCHID,
  COLOR_MAJORELLE_BLUE,
  COLOR_BLEU_DE_FRANCE,
  COLOR_PACIFIC_BLUE,
  COLOR_MOUNTAIN_MEADOW,
  COLOR_YELLOW_GREEN,
  COLOR_CHROME_YELLOW,
  COLOR_HEAT_WAVE,
};
