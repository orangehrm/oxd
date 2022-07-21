<script lang="ts">
import {CalendarDayAttributes, CalendarEvent} from './types';
import {computed, defineComponent, h, PropType} from 'vue';

export default defineComponent({
  name: 'oxd-calendar-date',
  props: {
    date: {
      type: Date as PropType<Date>,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    today: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Number,
      default: 0,
    },
    attributes: {
      type: Object as PropType<CalendarDayAttributes>,
      default: () => ({}),
    },
    event: {
      type: Object as PropType<CalendarEvent>,
      default: () => ({}),
    },
  },
  setup(props) {
    const innerClasses = computed(() => {
      return props?.event?.class ? props.event.class.split(' ') : [];
    });

    const wrapperClasses = computed(() => {
      return props?.attributes?.class ? props.attributes.class.split(' ') : [];
    });

    return {
      innerClasses,
      wrapperClasses,
    };
  },
  render() {
    return h(
      'div',
      {
        class: [
          ...this.wrapperClasses,
          {'oxd-calendar-date-wrapper': true},
          {[`--offset-${this.offset}`]: this.offset},
        ],
        style: this.attributes?.style,
      },
      h(
        'div',
        {
          tabindex: this.disabled ? -1 : 0,
          class: [
            ...this.innerClasses,
            {'oxd-calendar-date': true},
            {'--disabled': this.disabled},
            {'--selected': this.selected},
            {'--today': this.today},
          ],
          style: this.event?.style,
        },
        this.date.getDate(),
      ),
    );
  },
});
</script>
