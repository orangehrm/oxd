import {mount} from '@vue/test-utils';
import Calendar from '@orangehrm/oxd/core/components/Calendar/Calendar.vue';
import DateVue from '@orangehrm/oxd/core/components/Calendar/Date.vue';
import Icon from '@orangehrm/oxd/core/components/Button/Icon.vue';
import {nextSunday, freshDate} from '../../../../utils/date';

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
    expect(date.find('.oxd-calendar-date.--selected')).toBeTruthy();
    if (date.find('.oxd-calendar-date.--selected').exists()) {
      expect(date.find('.oxd-calendar-date.--selected').exists()).toBeTruthy();
    }
  });
  it('should show today date', async () => {
    const wrapper = mount(Calendar, {});
    expect(wrapper.find('.oxd-calendar-date.--today').text()).toStrictEqual(
      String(freshDate().getDate()),
    );
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
    expect(
      wrapper
        .find('.oxd-calendar-date-wrapper.--non-working-day')
        .find('.oxd-calendar-date')
        .text(),
    ).toStrictEqual('1');
    expect(
      wrapper
        .find('.oxd-calendar-date-wrapper.--working-day-half')
        .find('.oxd-calendar-date')
        .text(),
    ).toStrictEqual('7');
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
    expect(
      wrapper.find('.oxd-calendar-date.--holiday-full').text(),
    ).toStrictEqual('29');
    expect(
      wrapper.find('.oxd-calendar-date.--holiday-half').text(),
    ).toStrictEqual('5');
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

  describe('calculateInitialMonth behavior', () => {
    describe('without min/max props', () => {
      it('should show the current month when no modelValue is provided', () => {
        const currentDate = new Date();
        const wrapper = mount(Calendar, {});

        expect(wrapper.vm.year).toBe(currentDate.getFullYear());
        expect(wrapper.vm.month).toBe(currentDate.getMonth());
      });

      it('should show the month of modelValue when provided', () => {
        const testDate = new Date(2023, 5, 15); // June 15, 2023
        const wrapper = mount(Calendar, {
          props: {
            modelValue: testDate,
          },
        });

        expect(wrapper.vm.year).toBe(2023);
        expect(wrapper.vm.month).toBe(5); // June (0-based)
      });

      it('should show current month when modelValue equals current date', () => {
        const currentDate = freshDate();
        const wrapper = mount(Calendar, {
          props: {
            modelValue: currentDate,
          },
        });

        expect(wrapper.vm.year).toBe(currentDate.getFullYear());
        expect(wrapper.vm.month).toBe(currentDate.getMonth());
      });
    });

    describe('with min prop only', () => {
      it('should show current month when current month is after min', () => {
        const currentDate = new Date();
        const minDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 2,
          1,
        ); // 2 months before current

        const wrapper = mount(Calendar, {
          props: {
            min: minDate,
          },
        });

        expect(wrapper.vm.year).toBe(currentDate.getFullYear());
        expect(wrapper.vm.month).toBe(currentDate.getMonth());
      });

      it('should show current month when current month equals min month', () => {
        const currentDate = new Date();
        const minDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1,
        ); // Same month as current

        const wrapper = mount(Calendar, {
          props: {
            min: minDate,
          },
        });

        expect(wrapper.vm.year).toBe(currentDate.getFullYear());
        expect(wrapper.vm.month).toBe(currentDate.getMonth());
      });

      it('should show min month when current month is before min', () => {
        const currentDate = new Date();
        const minDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 2,
          1,
        ); // 2 months after current

        const wrapper = mount(Calendar, {
          props: {
            min: minDate,
          },
        });

        expect(wrapper.vm.year).toBe(minDate.getFullYear());
        expect(wrapper.vm.month).toBe(minDate.getMonth());
      });

      it('should show modelValue month even when modelValue is before min', () => {
        const modelDate = new Date(2023, 2, 15); // March 15, 2023
        const minDate = new Date(2023, 5, 1); // June 1, 2023

        const wrapper = mount(Calendar, {
          props: {
            modelValue: modelDate,
            min: minDate,
          },
        });

        expect(wrapper.vm.year).toBe(2023);
        expect(wrapper.vm.month).toBe(2); // March (0-based) - modelValue takes precedence
      });
    });

    describe('with max prop only', () => {
      it('should show current month when current month is before max', () => {
        const currentDate = new Date();
        const maxDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 2,
          15,
        ); // 2 months after current

        const wrapper = mount(Calendar, {
          props: {
            max: maxDate,
          },
        });

        expect(wrapper.vm.year).toBe(currentDate.getFullYear());
        expect(wrapper.vm.month).toBe(currentDate.getMonth());
      });

      it('should show current month when current month equals max month', () => {
        const currentDate = new Date();
        const maxDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          15,
        ); // Same month as current

        const wrapper = mount(Calendar, {
          props: {
            max: maxDate,
          },
        });

        expect(wrapper.vm.year).toBe(currentDate.getFullYear());
        expect(wrapper.vm.month).toBe(currentDate.getMonth());
      });

      it('should show max month when current month is after max', () => {
        const currentDate = new Date();
        const maxDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 2,
          15,
        ); // 2 months before current

        const wrapper = mount(Calendar, {
          props: {
            max: maxDate,
            modelValue: undefined,
          },
        });

        expect(wrapper.vm.year).toBe(maxDate.getFullYear());
        expect(wrapper.vm.month).toBe(maxDate.getMonth());
      });

      it('should show modelValue month even when modelValue is after max', () => {
        const modelDate = new Date(2023, 8, 15); // September 15, 2023
        const maxDate = new Date(2023, 5, 30); // June 30, 2023

        const wrapper = mount(Calendar, {
          props: {
            modelValue: modelDate,
            max: maxDate,
          },
        });

        expect(wrapper.vm.year).toBe(2023);
        expect(wrapper.vm.month).toBe(8); // September (0-based) - modelValue takes precedence
      });
    });

    describe('with both min and max props', () => {
      it('should show current month when current is within min-max range', () => {
        const currentDate = new Date();
        const minDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          1,
        ); // 1 month before
        const maxDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          30,
        ); // 1 month after

        const wrapper = mount(Calendar, {
          props: {
            min: minDate,
            max: maxDate,
          },
        });

        expect(wrapper.vm.year).toBe(currentDate.getFullYear());
        expect(wrapper.vm.month).toBe(currentDate.getMonth());
      });

      it('should show min month when current is before min', () => {
        const currentDate = new Date();
        const minDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          1,
        ); // 1 month after current
        const maxDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 3,
          30,
        ); // 3 months after current

        const wrapper = mount(Calendar, {
          props: {
            min: minDate,
            max: maxDate,
          },
        });

        expect(wrapper.vm.year).toBe(minDate.getFullYear());
        expect(wrapper.vm.month).toBe(minDate.getMonth());
      });

      it('should show max month when current is after max', () => {
        const currentDate = new Date();
        const minDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 3,
          1,
        ); // 3 months before current
        const maxDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          30,
        ); // 1 month before current

        const wrapper = mount(Calendar, {
          props: {
            min: minDate,
            max: maxDate,
          },
        });

        expect(wrapper.vm.year).toBe(maxDate.getFullYear());
        expect(wrapper.vm.month).toBe(maxDate.getMonth());
      });

      it('should show modelValue month when within range', () => {
        const modelDate = new Date(2023, 4, 15); // May 15, 2023
        const minDate = new Date(2023, 2, 1); // March 1, 2023
        const maxDate = new Date(2023, 7, 30); // August 30, 2023

        const wrapper = mount(Calendar, {
          props: {
            modelValue: modelDate,
            min: minDate,
            max: maxDate,
          },
        });

        expect(wrapper.vm.year).toBe(2023);
        expect(wrapper.vm.month).toBe(4); // May (0-based)
      });

      it('should show modelValue month even when modelValue is before min', () => {
        const modelDate = new Date(2023, 1, 15); // February 15, 2023
        const minDate = new Date(2023, 3, 1); // April 1, 2023
        const maxDate = new Date(2023, 7, 30); // August 30, 2023

        const wrapper = mount(Calendar, {
          props: {
            modelValue: modelDate,
            min: minDate,
            max: maxDate,
          },
        });

        expect(wrapper.vm.year).toBe(2023);
        expect(wrapper.vm.month).toBe(1); // February (0-based) - modelValue takes precedence
      });

      it('should show modelValue month even when modelValue is after max', () => {
        const modelDate = new Date(2023, 9, 15); // October 15, 2023
        const minDate = new Date(2023, 2, 1); // March 1, 2023
        const maxDate = new Date(2023, 6, 30); // July 30, 2023

        const wrapper = mount(Calendar, {
          props: {
            modelValue: modelDate,
            min: minDate,
            max: maxDate,
          },
        });

        expect(wrapper.vm.year).toBe(2023);
        expect(wrapper.vm.month).toBe(9); // October (0-based) - modelValue takes precedence
      });
    });

    describe('when modelValue equals current date', () => {
      it('should show modelValue month when modelValue equals current date and current is before min', () => {
        const currentDate = freshDate();
        const minDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 2,
          1,
        ); // 2 months after current

        const wrapper = mount(Calendar, {
          props: {
            modelValue: currentDate,
            min: minDate,
          },
        });

        expect(wrapper.vm.year).toBe(currentDate.getFullYear());
        expect(wrapper.vm.month).toBe(currentDate.getMonth());
      });

      it('should show modelValue month when modelValue equals current date and current is after max', () => {
        const currentDate = freshDate();
        const maxDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 2,
          15,
        ); // 2 months before current

        const wrapper = mount(Calendar, {
          props: {
            modelValue: currentDate,
            max: maxDate,
          },
        });

        expect(wrapper.vm.year).toBe(currentDate.getFullYear());
        expect(wrapper.vm.month).toBe(currentDate.getMonth());
      });

      it('should show current month when modelValue equals current date and current is within min-max range', () => {
        const currentDate = freshDate();
        const minDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          1,
        ); // 1 month before current
        const maxDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          30,
        ); // 1 month after current

        const wrapper = mount(Calendar, {
          props: {
            modelValue: currentDate,
            min: minDate,
            max: maxDate,
          },
        });

        expect(wrapper.vm.year).toBe(currentDate.getFullYear());
        expect(wrapper.vm.month).toBe(currentDate.getMonth());
      });

      it('should show modelValue month when modelValue equals current date and current is before min with both constraints', () => {
        const currentDate = freshDate();
        const minDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          1,
        ); // 1 month after current
        const maxDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 3,
          30,
        ); // 3 months after current

        const wrapper = mount(Calendar, {
          props: {
            modelValue: currentDate,
            min: minDate,
            max: maxDate,
          },
        });

        expect(wrapper.vm.year).toBe(currentDate.getFullYear());
        expect(wrapper.vm.month).toBe(currentDate.getMonth());
      });

      it('should show modelValue month when modelValue equals current date and current is after max with both constraints', () => {
        const currentDate = freshDate();
        const minDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 3,
          1,
        ); // 3 months before current
        const maxDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          30,
        ); // 1 month before current

        const wrapper = mount(Calendar, {
          props: {
            modelValue: currentDate,
            min: minDate,
            max: maxDate,
          },
        });

        expect(wrapper.vm.year).toBe(currentDate.getFullYear());
        expect(wrapper.vm.month).toBe(currentDate.getMonth());
      });
    });
  });
});
