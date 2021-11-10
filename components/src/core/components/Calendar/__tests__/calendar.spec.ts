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

import {mount} from '@vue/test-utils';
import Calendar from '@ohrm/oxd/core/components/Calendar/Calendar.vue';
import DateVue from '@ohrm/oxd/core/components/Calendar/Date.vue';
import Icon from '@ohrm/oxd/core/components/Button/Icon.vue';
import {nextSunday, nextSaturday, freshDate} from '../../../../utils/date';

describe('Calendar.vue', () => {
  const dateExpected = new Date(1990, 6, 27, 0, 0, 0);
  it('renders OXD Calendar', () => {
    const wrapper = mount(Calendar, {
      props: {
        modelValue: dateExpected,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should select date on click', async () => {
    const wrapper = mount(Calendar, {});
    const date = wrapper.findComponent(DateVue);
    await date.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(date.find('.oxd-calendar-date.--selected').exists()).toBeTruthy();
  });
  it('should show today date', async () => {
    const wrapper = mount(Calendar, {});
    const date = wrapper.findAllComponents(DateVue);
    const today = freshDate();
    expect(
      date[today.getDate()].find('.oxd-calendar-date.--today').exists(),
    ).toBeTruthy();
  });
  it('should show attributes in calendar', async () => {
    const wrapper = mount(Calendar, {
      props: {
        modelValue: dateExpected,
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
      },
    });
    const date = wrapper.findAllComponents(DateVue);
    const nonWorkingDay = nextSunday(dateExpected);
    const halfWorkingDay = nextSaturday(dateExpected);
    expect(
      date[nonWorkingDay.getDate()]
        .find('.oxd-calendar-date-wrapper.--non-working-day')
        .exists(),
    ).toBeTruthy();
    expect(
      date[halfWorkingDay.getDate()]
        .find('.oxd-calendar-date-wrapper.--working-day-half')
        .exists(),
    ).toBeTruthy();
  });
  it('should show events in calendar', async () => {
    const event1 = {
      date: nextSunday(dateExpected),
      type: 'holiday',
      class: '--holiday-full',
    };
    const event2 = {
      date: new Date(1990, 6, 5, 0, 0, 0),
      type: 'holiday',
      class: '--holiday-half',
    };
    const wrapper = mount(Calendar, {
      props: {
        modelValue: dateExpected,
        events: [event1, event2],
      },
    });
    const date = wrapper.findAllComponents(DateVue);
    expect(
      date[event1.date.getDate()]
        .find('.oxd-calendar-date.--holiday-full')
        .exists(),
    ).toBeTruthy();
    expect(
      date[event2.date.getDate()]
        .find('.oxd-calendar-date.--holiday-half')
        .exists(),
    ).toBeTruthy();
  });
  it('should emit selectMonth on month change', async () => {
    const wrapper = mount(Calendar, {});
    await wrapper.findComponent(Icon).trigger('click');
    expect(wrapper.emitted('selectMonth')).toBeTruthy();
  });
  it('should emit selectYear on year change', async () => {
    const wrapper = mount(Calendar, {
      props: {
        modelValue: new Date(1990, 0, 1, 0, 0, 0),
      },
    });
    await wrapper.findComponent(Icon).trigger('click');
    expect(wrapper.emitted('selectYear')).toBeTruthy();
  });
});
