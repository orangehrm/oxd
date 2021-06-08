<script lang="ts">
import {
  isEqual,
  getDaysInMonth,
  getYear,
  getMonth,
  getDayOffset,
  freshDate,
  rearrangeWeek,
} from '../../../utils/date';
import {enGB} from 'date-fns/locale';
import {DateOptions} from './types';
import {computed, defineComponent, h, PropType, reactive, toRefs} from 'vue';
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
    dateAttributes: {
      type: Array as PropType<DateOptions[]>,
      default: () => [],
    },
  },
  setup(props) {
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
      return datesOfMonth.value.map((date, index) => {
        const attrs = props.dateAttributes.filter(item =>
          isEqual(date, item?.date),
        )[0];
        return {
          selected: isEqual(date, selectedDate.value),
          offset: index === 0 ? getDayOffset(date, props.firstDayOfWeek) : 0,
          ...attrs,
        };
      });
    });

    return {
      ...toRefs(state),
      daysOfWeek,
      datesOfMonth,
      monthsOfYear,
      selectedDate,
      attributes,
    };
  },

  render() {
    return h('div', {class: 'oxd-calendar-wrapper'}, [
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
          return h(DateVue, {
            key: date.valueOf(),
            date,
            options: this.attributes[i],
            onClick: ($event: Event) => {
              $event.stopPropagation();
              this.$emit('update:modelValue', date);
            },
          });
        }),
      ),
    ]);
  },
});
</script>

<style src="./calendar.scss" lang="scss" module></style>
