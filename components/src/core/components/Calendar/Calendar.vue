<script lang="ts">
import {
  isEqual,
  isAfter,
  isBefore,
  getDaysInMonth,
  getYear,
  getMonth,
  getDayOffset,
  freshDate,
  rearrangeWeek,
  formatDate,
} from '../../../utils/date';
import {enGB} from 'date-fns/locale';
import {CalendarDayAttributes, CalendarEvent} from './types';
import {
  computed,
  defineComponent,
  h,
  PropType,
  reactive,
  toRefs,
  watch,
} from 'vue';
import Day from '@orangehrm/oxd/core/components/Calendar/Day.vue';
import DateVue from '@orangehrm/oxd/core/components/Calendar/Date.vue';
import CalendarController from '@orangehrm/oxd/core/components/Calendar/CalendarController.vue';

export default defineComponent({
  name: 'oxd-calendar',
  props: {
    modelValue: {
      type: Object as PropType<Date>,
      default: () => {
        return undefined;
      },
    },
    firstDayOfWeek: {
      type: Number,
      default: 0, // 0 | 1 | 2 | 3 | 4 | 5 | 6 => 0 represents Sunday
    },
    years: {
      type: Array,
      default: () => {
        return Array.from(
          {length: getYear(new Date()) - 1969},
          (_, i) => 1970 + i,
        );
      },
    },
    min: {
      type: Date,
    },
    max: {
      type: Date,
    },
    locale: {
      type: Object as PropType<Locale>,
      default: enGB,
    },
    monthFormat: {
      type: String,
      default: 'wide',
    },
    months: {
      type: Array,
      default: () => [],
    },
    dayFormat: {
      type: String,
      default: 'narrow',
    },
    days: {
      type: Array,
      default: () => [],
    },
    dayAttributes: {
      type: Array as PropType<CalendarDayAttributes[]>,
      default: () => [],
    },
    events: {
      type: Array as PropType<CalendarEvent[]>,
      default: () => [],
    },
  },
  setup(props, context) {
    const modifiedModelValue = props.modelValue || freshDate();

    const selectedDate = computed(() => {
      return modifiedModelValue
        ? new Date(modifiedModelValue.setHours(0, 0, 0, 0))
        : modifiedModelValue;
    });

    const calculateInitialMonth = () => {
      // If modelValue exists, use its month/year regardless of min/max constraints
      if (props.modelValue) {
        const targetYear = getYear(props.modelValue);
        const targetMonth = getMonth(props.modelValue);
        return {year: targetYear, month: targetMonth};
      }

      // If no modelValue, use current date and apply min/max constraints
      let targetYear = getYear(modifiedModelValue);
      let targetMonth = getMonth(modifiedModelValue);

      // Create a date for the first day of the target month for comparison
      const targetMonthDate = new Date(targetYear, targetMonth, 1);

      // If min is set and target month is before min, use min's month
      if (props.min) {
        const minMonthDate = new Date(
          getYear(props.min),
          getMonth(props.min),
          1,
        );
        if (targetMonthDate < minMonthDate) {
          targetYear = getYear(props.min);
          targetMonth = getMonth(props.min);
        }
      }

      // If max is set and target month is after max, use max's month
      if (props.max) {
        const maxMonthDate = new Date(
          getYear(props.max),
          getMonth(props.max),
          1,
        );
        if (targetMonthDate > maxMonthDate) {
          targetYear = getYear(props.max);
          targetMonth = getMonth(props.max);
        }
      }

      return {year: targetYear, month: targetMonth};
    };

    const state = reactive(calculateInitialMonth());

    const daysOfWeek = computed(() => {
      let days = JSON.parse(JSON.stringify(props.days));
      const week = rearrangeWeek(props.firstDayOfWeek);

      if (days.length === 0) {
        days = new Array(7).fill('').map((...[, index]) => {
          return (props.locale as Locale).localize.day(index, {
            width: props.dayFormat,
          });
        });
      }

      return week.map(index => {
        return days[index];
      });
    });

    const monthsOfYear = computed(() => {
      if (props.months.length > 0) {
        return props.months;
      } else {
        return new Array(12).fill('').map((...[, index]) => {
          return (props.locale as Locale).localize.month(index, {
            width: props.monthFormat,
          });
        });
      }
    });

    const datesOfMonth = computed(() => {
      return new Array(getDaysInMonth(new Date(state.year, state.month)))
        .fill('')
        .map((...[, index]) => {
          return new Date(state.year, state.month, ++index);
        });
    });

    const attributes = computed(() => {
      return datesOfMonth.value.map(date => {
        const attrs = props.dayAttributes.find(
          attr => date.getDay() === attr.index,
        );
        return attrs;
      });
    });

    const parsedEvents = computed(() => {
      return datesOfMonth.value.map(date => {
        const event = props.events.find(e => isEqual(date, e.date));
        return event;
      });
    });

    watch(
      () => state.year,
      () => {
        context.emit('selectYear', {month: state.month, year: state.year});
      },
    );

    watch(
      () => state.month,
      () => {
        context.emit('selectMonth', {month: state.month, year: state.year});
      },
    );

    return {
      ...toRefs(state),
      daysOfWeek,
      datesOfMonth,
      monthsOfYear,
      selectedDate,
      attributes,
      parsedEvents,
    };
  },

  emits: ['update:modelValue', 'selectMonth', 'selectYear'],

  render() {
    /**
     * Vue scoped styles not working for render function
     * https://github.com/vuejs/vue-next/issues/1539
     *
     */
    return h(
      'div',
      {class: 'oxd-calendar-wrapper'},
      [
        h(CalendarController, {
          modelValue: {year: this.year, month: this.month},
          years: this.years,
          months: this.monthsOfYear,
          'onUpdate:modelValue': ({month, year}) => {
            (this.month = month), (this.year = year);
          },
        }),
        h(
          'div',
          {class: 'oxd-calendar-week-grid'},
          this.daysOfWeek.map((day: string) => {
            return h(Day, {name: day, key: day});
          }),
        ),
        h(
          'div',
          {class: 'oxd-calendar-dates-grid'},
          this.datesOfMonth.map((date: Date, i: number) => {
            let disabledDate = false;
            if (this.max && this.min) {
              disabledDate =
                isAfter(
                  formatDate(date, 'yyyy-MM-dd'),
                  formatDate(this.max, 'yyyy-MM-dd'),
                  'yyyy-MM-dd',
                ) ||
                isBefore(
                  formatDate(date, 'yyyy-MM-dd'),
                  formatDate(this.min, 'yyyy-MM-dd'),
                  'yyyy-MM-dd',
                )
                  ? true
                  : false;
            } else if (this.max && !this.min) {
              disabledDate = isAfter(
                formatDate(date, 'yyyy-MM-dd'),
                formatDate(this.max, 'yyyy-MM-dd'),
                'yyyy-MM-dd',
              )
                ? true
                : false;
            } else if (!this.max && this.min) {
              disabledDate = isBefore(
                formatDate(date, 'yyyy-MM-dd'),
                formatDate(this.min, 'yyyy-MM-dd'),
                'yyyy-MM-dd',
              )
                ? true
                : false;
            } else {
              disabledDate = false;
            }
            return h(DateVue, {
              key: date.valueOf(),
              date,
              selected: isEqual(date, this.selectedDate),
              disabled: disabledDate,
              today: isEqual(freshDate(), date),
              offset: i === 0 ? getDayOffset(date, this.firstDayOfWeek) : 0,
              attributes: this.attributes[i],
              event: this.parsedEvents[i],
              onKeyup: ($event: KeyboardEvent) => {
                if ($event.key === 'Enter') {
                  if (!disabledDate) {
                    $event.stopPropagation();
                    this.$emit('update:modelValue', date);
                  }
                }
              },
              onClick: ($event: Event) => {
                if (!disabledDate) {
                  $event.stopPropagation();
                  this.$emit('update:modelValue', date);
                }
              },
            });
          }),
        ),
      ].concat(
        this.$slots.default != undefined
          ? [h('div', this.$slots.default())]
          : [],
      ),
    );
  },
});
</script>

<style src="./calendar.scss" lang="scss"></style>
