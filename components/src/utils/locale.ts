import {enUS} from 'date-fns/locale';

export type LangPack = {
  narrow?: string[];
  short?: string[];
  abbreviated?: string[];
  wide?: string[];
};

export interface LangStrings {
  months: LangPack;
  days: LangPack;
}

const monthDefaultValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  wide: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};

const daysDefaultValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
};

function buildLocale(langstrings: LangStrings): Locale {
  if (!enUS.localize) throw new Error('localize object undefined');
  const buildLocalizeStrings = (langPack: LangPack, fallback: LangPack) => {
    return (
      index: number,
      options: {width: keyof LangPack} = {width: 'wide'},
    ) => {
      const _default = fallback[options.width]?.[index];
      return langPack[options.width]?.[index] ?? _default;
    };
  };
  const {dayPeriod, era, ordinalNumber, quarter} = enUS.localize;

  return {
    ...enUS,
    code: 'orange-enUS',
    localize: {
      dayPeriod,
      era,
      ordinalNumber,
      quarter,
      day: buildLocalizeStrings(langstrings.days, daysDefaultValues),
      month: buildLocalizeStrings(langstrings.months, monthDefaultValues),
    },
  };
}

export default buildLocale;
