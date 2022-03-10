import {enUS} from 'date-fns/locale';

export type DayPeriod = {
  [name: string]: string;
};

export type LangPack = {
  narrow?: string[];
  short?: string[];
  abbreviated?: string[];
  wide?: string[];
};

export type DayPeriodLangPack = {
  narrow?: DayPeriod;
  short?: DayPeriod;
  abbreviated?: DayPeriod;
  wide?: DayPeriod;
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
  dayPeriodValues: DayPeriodLangPack;
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

const dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night',
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night',
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night',
  },
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

  const buildDayPeriodLocalizeStrings = (
    langPack: DayPeriodLangPack,
    fallback: DayPeriodLangPack,
  ) => {
    return (
      index: string,
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
  const {era, ordinalNumber, quarter} = enUS.localize;

  return {
    ...enUS,
    code: 'orange-enUS',
    localize: {
      era,
      ordinalNumber,
      quarter,
      day: buildLocalizeStrings(langstrings.days, daysDefaultValues),
      month: buildLocalizeStrings(langstrings.months, monthDefaultValues),
      dayPeriod: buildDayPeriodLocalizeStrings(
        langstrings.dayPeriodValues,
        dayPeriodValues,
      ),
    },
    formatRelative: buildRealtiveDatesLocalizeStrings(
      langstrings.relativeDate,
      formatRelativeLocale,
    ),
  };
}

export default buildLocale;
