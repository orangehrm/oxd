<script lang="ts">
import {CalendarDayAttributes, CalendarEvent, STRICT_BLACKOUT, WARNING_BLACKOUT} from './types';
import {computed, defineComponent, h, PropType} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'oxd-calendar-date',
  components: {
    'oxd-icon': Icon,
  },
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

    const tooltipText = computed(() => {
      // Prioritize event tooltip, fallback to attributes tooltip
      return props?.event?.tooltip || '';
    });

    const tooltipPosition = computed(() => {
      return props?.event?.tooltipPosition || 'top';
    });

    const showBlackoutIcon = computed(() => {
      return props.event?.type === STRICT_BLACKOUT || props.event?.type === WARNING_BLACKOUT;
    });

    return {
      innerClasses,
      wrapperClasses,
      tooltipText,
      tooltipPosition,
      showBlackoutIcon,
    };
  },
  render() {
    const dateContent = [];
    
    // Date number
    dateContent.push(String(this.date.getDate()));
    
    // Add slash-circle icon for both strict and warning blackout dates
    if (this.showBlackoutIcon) {
      dateContent.push(
        h(Icon, {
          name: 'oxd-slash-circle',
          class: 'oxd-calendar-date-icon',
        })
      );
    }
    
    return h(
      'div',
      Object.assign(
        {
          class: [
            ...this.wrapperClasses,
            {'oxd-calendar-date-wrapper': true},
            {[`--offset-${this.offset}`]: this.offset},
          ],
          style: this.attributes?.style,
        },
        // Apply tooltip to wrapper element to avoid layout interference
        this.tooltipText ? {
          tooltip: this.tooltipText,
          flow: this.tooltipPosition,
        } : {}
      ),
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
        dateContent,
      ),
    );
  },
});
</script>
