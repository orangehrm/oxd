import Calendar from '@orangehrm/oxd/core/components/Calendar/Calendar';
import {
  DAYS_OF_WEEK,
  MONTHS_OF_YEAR,
} from '@orangehrm/oxd/core/components/Calendar/types';
import {ref} from 'vue';

export default {
  title: 'Example/Calendar',
};

const argTypes = {
  firstDayOfWeek: {
    control: {type: 'select', options: [0, 1, 2, 3, 4, 5, 6]},
  },
  years: {control: {type: 'object'}, defaultValue: [2020, 2021]},
  months: {control: {type: 'object'}, defaultValue: MONTHS_OF_YEAR},
  days: {control: {type: 'object'}, defaultValue: DAYS_OF_WEEK},
};

const Template = args => ({
  setup() {
    const selected = ref('2021-06-01');
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
  dateAttributes: [
    {
      date: new Date(2021, 5, 24),
      holiday: true,
    },
    {
      date: new Date(2021, 5, 12),
      leaveFull: true,
    },
    {
      date: new Date(2021, 5, 15),
      leaveHalf: true,
    },
  ],
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
      leaveFull: true,
    },
    {
      date: new Date(2021, 5, 15),
      leaveHalf: true,
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
};
