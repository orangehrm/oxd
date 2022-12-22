<!--
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
-->

<script lang="ts">
import {CalendarDayAttributes, CalendarEvent} from './types';
import {computed, defineComponent, h, PropType} from 'vue';

export default defineComponent({
  name: 'OxdCalendarDate',
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
          class: [
            ...this.innerClasses,
            {'oxd-calendar-date': true},
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
