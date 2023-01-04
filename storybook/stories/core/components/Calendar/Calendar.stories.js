/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */

import Calendar from '@ohrm/oxd/core/components/Calendar/Calendar';
import {ref} from 'vue';
import {enGB, ru} from 'date-fns/locale';
import {getDaysInMonth} from 'date-fns';

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

const Template = (args) => ({
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
  events: datesOfMonth().map((date) => {
    if (date.getDate() % 2 === 0) {
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
