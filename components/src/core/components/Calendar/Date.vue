<script lang="ts">
import {freshDate, isWeekend, isEqual} from '../../../utils/date';
import {DateOptions} from './types';
import {computed, defineComponent, h, PropType} from 'vue';

export default defineComponent({
  name: 'oxd-calendar-date',
  props: {
    date: {
      type: Date as PropType<Date>,
      required: true,
    },
    options: {
      type: Object as PropType<DateOptions>,
      required: true,
    },
  },
  setup(props) {
    const classes = computed(() => {
      return {
        'oxd-calendar-date': true,
        '--selected': props.options.selected,
        '--today': isEqual(freshDate(), props.date),
        '--holiday': props.options?.holiday,
        '--highlight-full': props.options?.highlightFull,
        '--highlight-half': props.options?.highlightHalf,
      };
    });

    return {
      classes,
    };
  },
  render() {
    return h(
      'div',
      {
        class: {
          'oxd-calendar-date-wrapper': true,
          '--weekend': isWeekend(this.date),
          [`--offset-${this.options?.offset}`]: this.options?.offset
            ? true
            : false,
        },
      },
      h(
        'div',
        {
          class: this.classes,
        },
        this.date.getDate(),
      ),
    );
  },
});
</script>
