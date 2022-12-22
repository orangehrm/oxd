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

import {mount, shallowMount} from '@vue/test-utils';
import CalendarController from '@ohrm/oxd/core/components/Calendar/CalendarController.vue';
import Icon from '@ohrm/oxd/core/components/Button/Icon.vue';

describe('CalendarController.vue', () => {
  // https://github.com/jsdom/jsdom/issues/1695
  window.HTMLElement.prototype.scrollIntoView = function () {
    //do nothing
  };

  const months = [
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
  ];
  const years = [2019, 2020, 2021, 2022];
  const modelValue = {
    month: 2,
    year: 2020,
  };
  it('renders OXD CalendarController', () => {
    const wrapper = mount(CalendarController, {
      props: {
        months,
        years,
        modelValue,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should open month dropdown on click', async () => {
    const wrapper = mount(CalendarController, {
      props: {
        months,
        years,
        modelValue,
      },
    });
    await wrapper.find('.oxd-calendar-selector-month').trigger('click');
    expect(
      wrapper.findAll(
        '.oxd-calendar-selector-month .oxd-calendar-dropdown--option',
      ).length,
    ).toEqual(12);
  });
  it('should open year dropdown on click', async () => {
    const wrapper = mount(CalendarController, {
      props: {
        months,
        years,
        modelValue,
      },
    });
    await wrapper.find('.oxd-calendar-selector-year').trigger('click');
    expect(
      wrapper.findAll(
        '.oxd-calendar-selector-year .oxd-calendar-dropdown--option',
      ).length,
    ).toEqual(4);
  });
  it('should select month on click', async () => {
    const wrapper = mount(CalendarController, {
      props: {
        months,
        years,
        modelValue,
      },
    });
    await wrapper.find('.oxd-calendar-selector-month').trigger('click');
    await wrapper
      .find('.oxd-calendar-selector-month .oxd-calendar-dropdown--option')
      .trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([
      [{month: 0, year: 2020}],
    ]);
  });
  it('should select year on click', async () => {
    const wrapper = mount(CalendarController, {
      props: {
        months,
        years,
        modelValue,
      },
    });
    await wrapper.find('.oxd-calendar-selector-year').trigger('click');
    await wrapper
      .find('.oxd-calendar-selector-year .oxd-calendar-dropdown--option')
      .trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([
      [{month: 2, year: 2019}],
    ]);
  });
  it('should select next month on click right arrow', async () => {
    const wrapper = shallowMount(CalendarController, {
      props: {
        months,
        years,
        modelValue,
      },
    });
    await wrapper.findAllComponents(Icon)[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([
      [{month: 3, year: 2020}],
    ]);
  });
  it('should select previous month on click left arrow', async () => {
    const wrapper = shallowMount(CalendarController, {
      props: {
        months,
        years,
        modelValue,
      },
    });
    await wrapper.findAllComponents(Icon)[0].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([
      [{month: 1, year: 2020}],
    ]);
  });
  it('should select next year on click right arrow if current month is december', async () => {
    const wrapper = shallowMount(CalendarController, {
      props: {
        months,
        years,
        modelValue: {month: 11, year: 2020},
      },
    });
    await wrapper.findAllComponents(Icon)[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([
      [{month: 0, year: 2021}],
    ]);
  });
  it('should select previous year on click left arrow if current month is january', async () => {
    const wrapper = shallowMount(CalendarController, {
      props: {
        months,
        years,
        modelValue: {month: 0, year: 2020},
      },
    });
    await wrapper.findAllComponents(Icon)[0].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([
      [{month: 11, year: 2019}],
    ]);
  });
});
