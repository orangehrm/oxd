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
        return freshDate();
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
    const selectedDate = computed(() => {
      return props.modelValue
        ? new Date(props.modelValue.setHours(0, 0, 0, 0))
        : props.modelValue;
    });

    const state = reactive({
      year: getYear(selectedDate.value || new Date()),
      month: getMonth(selectedDate.value || new Date()),
    });

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
