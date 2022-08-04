import {mount, shallowMount} from '@vue/test-utils';
import CalendarController from '@orangehrm/oxd/core/components/Calendar/CalendarController.vue';
import Icon from '@orangehrm/oxd/core/components/Button/Icon.vue';

describe('CalendarController.vue', () => {
  window.HTMLElement.prototype.scrollIntoView = function() {
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
    expect(wrapper.findAll('.oxd-calendar-selector.--month').length).toEqual(
      12,
    );
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
    expect(wrapper.findAll('.oxd-calendar-selector.--year').length).toEqual(4);
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
    await wrapper.find('.oxd-calendar-selector.--month').trigger('click');
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
    await wrapper.find('.oxd-calendar-selector.--year').trigger('click');
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
