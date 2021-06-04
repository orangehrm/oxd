<script lang="ts">
import {
  parseDate,
  format,
  isEqual,
  getDaysInMonth,
  getYear,
  getMonth,
  getDayOffset,
  freshDate,
} from '../../../utils/date';
import {computed, defineComponent, h, PropType, reactive, toRefs} from 'vue';
import {DateOptions, DAYS_OF_WEEK, MONTHS_OF_YEAR, SUNDAY} from './types';
import Day from '@orangehrm/oxd/core/components/Calendar/Day.vue';
import DateVue from '@orangehrm/oxd/core/components/Calendar/Date.vue';
import CalendarController from '@orangehrm/oxd/core/components/Calendar/CalendarController.vue';

export default defineComponent({
  name: 'oxd-calendar',
  props: {
    modelValue: {
      type: [String, Date],
      default: () => {
        return freshDate();
      },
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd',
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
    months: {
      type: Array,
      default: () => MONTHS_OF_YEAR,
    },
    days: {
      type: Array,
      default: () => DAYS_OF_WEEK,
    },
    dateAttributes: {
      type: Array as PropType<DateOptions[]>,
      default: () => [],
    },
  },
  setup(props, context) {
    const selectedDate = computed(() => {
      return parseDate(props.modelValue, props.format);
    });

    const state = reactive({
      year: getYear(selectedDate.value || new Date()),
      month: getMonth(selectedDate.value || new Date()),
    });

    const daysOfWeek = computed(() => {
      const days = JSON.parse(JSON.stringify(props.days));
      if (props.firstDayOfWeek > 0) {
        return days.splice(props.firstDayOfWeek, 6).concat(days);
      } else {
        return days;
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

    const onDateSelected = (value: Date) => {
      context.emit('update:modelValue', format(value, props.format));
    };

    return {
      ...toRefs(state),
      daysOfWeek,
      datesOfMonth,
      selectedDate,
      attributes,
      onDateSelected,
    };
  },
  render() {
    return h('div', {class: 'oxd-calendar-wrapper'}, [
      h(CalendarController, {
        modelValue: {year: this.year, month: this.month},
        years: this.years,
        months: this.months,
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
              this.onDateSelected(date);
            },
          });
        }),
      ),
    ]);
  },
});
</script>

<style src="./calendar.scss" lang="scss" module></style>
