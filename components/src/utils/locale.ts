import {enUS} from 'date-fns/locale';

export type LangPack = {
  narrow?: string[];
  short?: string[];
  abbreviated?: string[];
  wide?: string[];
};

export type RealtiveDates = {
  lastWeek: string;
  yesterday: string;
  today: string;
  tomorrow: string;
  nextWeek: string;
  other: string;
};

export interface LangStrings {
  months: LangPack;
  days: LangPack;
  relativeDate: RealtiveDates;
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

const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P',
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

  const buildRealtiveDatesLocalizeStrings = (
    langPack: RealtiveDates,
    fallback: RealtiveDates,
  ) => {
    return (token: keyof RealtiveDates) => {
      return langPack[token] ? langPack[token] : fallback[token];
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
    formatRelative: buildRealtiveDatesLocalizeStrings(
      langstrings.relativeDate,
      formatRelativeLocale,
    ),
  };
}

export default buildLocale;
