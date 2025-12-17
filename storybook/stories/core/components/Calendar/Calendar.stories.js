import Calendar from '@orangehrm/oxd/core/components/Calendar/Calendar';
import {ref} from 'vue';
import {enGB, ru} from 'date-fns/locale';
import {getDaysInMonth} from 'date-fns';

export default {
  title: 'Inputs/Calendar',
};

const argTypes = {
  firstDayOfWeek: {
    control: {type: 'select', options: [0, 1, 2, 3, 4, 5, 6]},
  },
  monthFormat: {
    control: {
      type: 'select',
      options: ['narrow', 'abbreviated', 'wide'],
    },
  },
  dayFormat: {
    control: {
      type: 'select',
      options: ['narrow', 'short', 'abbreviated', 'wide'],
    },
  },
  years: {control: {type: 'object'}, defaultValue: [2019, 2020, 2021]},
  months: {control: {type: 'object'}},
  days: {control: {type: 'object'}},
};

const Template = args => ({
  setup() {
    const selected = ref(new Date());
    return {args, selected};
  },
  components: {Calendar},
  template: `<div>
  <Calendar v-model="selected" v-bind="args" />
  <br>
  <span>{{selected}}</span>
  </div>`,
});

const datesOfMonth = () => {
  const today = new Date();
  return new Array(getDaysInMonth(today)).fill('').map((...[, index]) => {
    return new Date(today.getFullYear(), today.getMonth(), ++index);
  });
};

export const Default = Template.bind({});
Default.argTypes = argTypes;
Default.args = {
  firstDayOfWeek: 0,
  monthFormat: 'wide',
  dayFormat: 'narrow',
  dayAttributes: [
    {
      index: 0, // sunday
      class: '--non-working-day',
      style: {},
    },
    {
      index: 6, // saturday
      class: '--working-day-half',
      style: {},
    },
  ],
  events: datesOfMonth().map(date => {
    if (date.getDay() % 6 === 0) {
      return {
        date,
        type: 'weekend',
        class: Math.random() > 0.5 ? '--working-weekend' : '',
      };
    } else if (date.getDate() % 2 === 0) {
      return {
        date,
        type: 'holiday',
        class: Math.random() > 0.5 ? '--holiday-full' : '--holiday-half',
      };
    } else {
      return {date};
    }
  }),
  locale: enGB,
};

export const RussianLocale = Template.bind({});
RussianLocale.argTypes = argTypes;
RussianLocale.args = {
  firstDayOfWeek: 0,
  monthFormat: 'wide',
  dayFormat: 'narrow',
  dayAttributes: [
    {
      index: 0, // sunday
      class: '--non-working-day',
      style: {},
    },
    {
      index: 6,
      class: '--non-working-day',
      style: {},
    },
  ],
  locale: ru,
};

export const SinhalaLocale = Template.bind({});
SinhalaLocale.argTypes = argTypes;
SinhalaLocale.args = {
  firstDayOfWeek: 1,
  dayAttributes: [
    {
      index: 0, // sunday
      class: '--non-working-day',
      style: {},
    },
    {
      index: 6,
      class: '--non-working-day',
      style: {},
    },
  ],
  days: ['ඉ', 'ස', 'අ', 'බ', 'බ්‍ර', 'සි', 'සෙ'],
  months: [
    'ජනවාරි',
    'පෙබරවාරි',
    'මාර්තු',
    'අප්‍රේල්',
    'මැයි',
    'ජූනි',
    'ජූලි',
    'අගෝස්තු',
    'සැප්තැම්බර්',
    'ඔක්තෝබර්',
    'නොවැම්බර්',
    'දෙසැම්බර්',
  ],
  locale: enGB,
};

export const CustomStyles = Template.bind({});
CustomStyles.argTypes = argTypes;
CustomStyles.args = {
  firstDayOfWeek: 0,
  monthFormat: 'wide',
  dayFormat: 'narrow',
  dayAttributes: [
    {
      index: 0, // sunday
      class: '--non-working-day',
      style: {},
    },
    {
      index: 1,
      class: '',
      style: {},
    },
    {
      index: 2,
      class: '',
      style: {},
    },
    {
      index: 3,
      class: '',
      style: {
        backgroundColor: 'limegreen',
        borderRadius: '100%',
      },
    },
    {
      index: 4,
      class: '',
      style: {},
    },
    {
      index: 5,
      class: '',
      style: {},
    },
    {
      index: 6,
      class: '--non-working-day',
      style: {},
    },
  ],
  locale: enGB,
};

export const BlackoutHolidays = Template.bind({});
BlackoutHolidays.argTypes = argTypes;
BlackoutHolidays.args = {
  firstDayOfWeek: 0,
  monthFormat: 'wide',
  dayFormat: 'narrow',
  dayAttributes: [
    {
      index: 0, // sunday
      class: '--non-working-day',
      style: {},
    },
    {
      index: 6, // saturday
      class: '--working-day-half',
      style: {},
    },
  ],
  events: datesOfMonth().map(date => {
    const day = date.getDate();
    
    // Strict blackout dates (Complete Holidays/Closures)
    if (day === 1) {
      return {
        date,
        type: 'strict-blackout',
        tooltip: 'New Year\'s Day - Office Closed',
        class: '--strict-blackout',
      };
    }
    
    if (day === 10) {
      return {
        date,
        type: 'strict-blackout',
        tooltip: 'Public Holiday - No Service Available',
        class: '--strict-blackout',
      };
    }
    
    if (day === 17) {
      return {
        date,
        type: 'strict-blackout',
        tooltip: 'System Maintenance - Service Unavailable',
        class: '--strict-blackout',
      };
    }
    
    if (day === 25) {
      return {
        date,
        type: 'strict-blackout',
        tooltip: 'Christmas Day - Office Closed',
        class: '--strict-blackout',
      };
    }
    
    // Warning blackout dates (Limited Service Days)
    if (day === 6) {
      return {
        date,
        type: 'warning-blackout',
        tooltip: 'Limited Staff - Reduced Capacity',
        class: '--warning-blackout',
      };
    }
    
    if (day === 16) {
      return {
        date,
        type: 'warning-blackout',
        tooltip: 'Training Day - Slower Response Time',
        class: '--warning-blackout',
      };
    }
    
    if (day === 20) {
      return {
        date,
        type: 'warning-blackout',
        tooltip: 'Peak Season - High Demand Expected',
        class: '--warning-blackout',
      };
    }
    
    if (day === 24) {
      return {
        date,
        type: 'warning-blackout',
        tooltip: 'Christmas Eve - Half Day (9AM-1PM)',
        class: '--warning-blackout',
      };
    }

    if (day === 26) {
      return {
        date,
        type: 'strict-blackout',
        class: '--strict-blackout-disabled',
        tooltip: 'Christmas Day - Office Closed',
      };
    }

    if (day === 27) {
      return {
        date,
        type: 'strict-blackout',
        class: '--strict-blackout-disabled',
        tooltip: 'Christmas Day - Office Closed',
      };
    }
    
    // Regular dates
    return {date};
  }),
  locale: enGB,
};
