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

/* eslint-disable */
// Extracted from date-fns https://github.com/date-fns/date-fns/blob/main/src/locale/_lib/buildLocalizeFn/index.ts
function buildMatchFn(args: Record<string, any>) {
  return (
    string: string,
    options: {width?: number; valueCallback?: (value: any) => void} = {
      width: undefined,
      valueCallback: undefined,
    },
  ) => {
    const width = options.width;

    const matchPattern =
      (width && args.matchPatterns[width]) ||
      args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];

    const parsePatterns =
      (width && args.parsePatterns[width]) ||
      args.parsePatterns[args.defaultParseWidth];

    const key = Array.isArray(parsePatterns)
      ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
      : findKey(parsePatterns, (pattern: any) => pattern.test(matchedString));

    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value as any) : value;

    const rest = string.slice(matchedString.length);

    return {value, rest};
  };
}

function findKey<Value, Obj extends {[key in string | number]: Value}>(
  object: Obj,
  predicate: (value: Value) => boolean,
): keyof Obj | undefined {
  for (const key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return undefined;
}

function findIndex<Item>(
  array: Item[],
  predicate: (item: Item) => boolean,
): number | undefined {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}
/* eslint-enable */

function buildLocale(langstrings: LangStrings): Locale {
  if (!enUS.localize || !enUS.match)
    throw new Error('localize object undefined');
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

  const buildLocalizeMatcher = (
    langPack: LangPack,
    fallback: Record<string, string[]>,
  ) => {
    const matchPatterns: Record<string, RegExp> = {};
    for (const key in fallback) {
      const values = langPack[key as keyof LangPack] || fallback[key];
      matchPatterns[key] = new RegExp(values.join('|').toLowerCase(), 'i');
    }
    const parsePatterns: Record<string, RegExp[]> = {};
    for (const key in langPack) {
      const values = langPack[key as keyof LangPack] || fallback[key];
      parsePatterns[key] = values.map(
        (value) => new RegExp(value.toLowerCase(), 'i'),
      );
    }
    return buildMatchFn({
      matchPatterns: matchPatterns,
      defaultMatchWidth: 'wide',
      parsePatterns: parsePatterns,
      defaultParseWidth: 'any',
    });
  };

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
    match: {
      era: enUS.match.era,
      ordinalNumber: enUS.match.ordinalNumber,
      quarter: enUS.match.quarter,
      day: buildLocalizeMatcher(langstrings.days, daysDefaultValues),
      month: buildLocalizeMatcher(langstrings.months, monthDefaultValues),
      dayPeriod: enUS.match.dayPeriod,
    },
  };
}

export default buildLocale;
