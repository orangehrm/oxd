import Calendar from '@orangehrm/oxd/core/components/Calendar/Calendar';
import {ref} from 'vue';
import {enGB, ru} from 'date-fns/locale';

export default {
  title: 'Example/Calendar',
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
    const selected = ref(new Date(2021, 5, 1));
    return {args, selected};
  },
  components: {Calendar},
  template: `<div>
  <Calendar v-model="selected" v-bind="args" />
  <br>
  <span>{{selected}}</span>
  </div>`,
});

export const Default = Template.bind({});
Default.argTypes = argTypes;
Default.args = {
  firstDayOfWeek: 0,
  monthFormat: 'wide',
  dayFormat: 'narrow',
  dateAttributes: [
    {
      date: new Date(2021, 5, 24),
      holiday: true,
    },
    {
      date: new Date(2021, 5, 12),
      highlightFull: true,
    },
    {
      date: new Date(2021, 5, 15),
      highlightHalf: true,
    },
  ],
  locale: enGB,
};

export const RussianLocale = Template.bind({});
RussianLocale.argTypes = argTypes;
RussianLocale.args = {
  firstDayOfWeek: 0,
  monthFormat: 'wide',
  dayFormat: 'narrow',
  dateAttributes: [
    {
      date: new Date(2021, 5, 24),
      holiday: true,
    },
    {
      date: new Date(2021, 5, 12),
      highlightFull: true,
    },
    {
      date: new Date(2021, 5, 15),
      highlightHalf: true,
    },
  ],
  locale: ru,
};

export const SinhalaLocale = Template.bind({});
SinhalaLocale.argTypes = argTypes;
SinhalaLocale.args = {
  firstDayOfWeek: 1,
  dateAttributes: [
    {
      date: new Date(2021, 5, 24),
      holiday: true,
    },
    {
      date: new Date(2021, 5, 12),
      highlightFull: true,
    },
    {
      date: new Date(2021, 5, 15),
      highlightHalf: true,
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
