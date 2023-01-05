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

<template>
  <div role="alert" class="oxd-time-picker">
    <div class="oxd-time-hour-input">
      <oxd-icon-button
        name="chevron-up"
        class="oxd-time-hour-input-up"
        role="none"
        :with-container="false"
        @click="increment(1, 'hour')"
      />
      <oxd-input
        :value="hour"
        class="oxd-time-hour-input-text"
        @change="onChange($event, 'hour')"
      />
      <oxd-icon-button
        name="chevron-down"
        class="oxd-time-hour-input-down"
        role="none"
        :with-container="false"
        @click="decrement(1, 'hour')"
      />
    </div>
    <div class="oxd-time-seperator">
      <span class="oxd-time-seperator-icon">:</span>
    </div>
    <div class="oxd-time-minute-input">
      <oxd-icon-button
        name="chevron-up"
        class="oxd-time-minute-input-up"
        role="none"
        :with-container="false"
        @click="increment(step, 'minute')"
      />
      <oxd-input
        :value="minute"
        class="oxd-time-minute-input-text"
        @change="onChange($event, 'minute')"
      />
      <oxd-icon-button
        name="chevron-down"
        class="oxd-time-minute-input-down"
        role="none"
        :with-container="false"
        @click="decrement(step, 'minute')"
      />
    </div>
    <div class="oxd-time-period-input">
      <div class="oxd-time-period-label">
        <input v-model="period" name="am" type="radio" value="AM" />
        <label for="am">AM</label>
      </div>
      <div class="oxd-time-period-label">
        <input v-model="period" name="pm" type="radio" value="PM" />
        <label for="pm">PM</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {parseDate, formatDate} from '../../../../utils/date';
import {defineComponent, reactive, toRefs, watchEffect} from 'vue';
import Input from '@ohrm/oxd/core/components/Input/Input.vue';
import IconButton from '@ohrm/oxd/core/components/Button/Icon.vue';

interface State {
  hour: string;
  minute: string;
  period: string;
}

export default defineComponent({
  name: 'OxdTimePicker',

  components: {
    'oxd-input': Input,
    'oxd-icon-button': IconButton,
  },

  props: {
    modelValue: {
      type: String,
      required: false,
      default: null,
    },
    step: {
      type: Number,
      required: false,
      default: 1,
    },
  },

  emits: ['update:modelValue'],

  setup(props, context) {
    const state: State = reactive({
      hour: '01',
      minute: '00',
      period: 'AM',
    });

    const setValue = (input: number, type: string) => {
      if (!isNaN(input)) {
        if (type === 'hour') {
          if (input > 0 && input <= 12) {
            state.hour = input < 10 ? '0' + input : input.toString();
          }
        } else {
          if (input >= 0 && input < 60) {
            // If input val is not a multiply of step, get nearest value
            const minutes = (Math.round(input / props.step) * props.step) % 60;
            state.minute = minutes < 10 ? '0' + minutes : minutes.toString();
          }
        }
      }
    };

    const onChange = ($event: Event, type: string) => {
      const input = parseInt(($event.target as HTMLInputElement).value);
      setValue(input, type);
    };

    const increment = (step: number, type: keyof State) => {
      const input = parseInt(state[type]);
      setValue(input + step, type);
    };

    const decrement = (step: number, type: keyof State) => {
      const input = parseInt(state[type]);
      setValue(input - step, type);
    };

    watchEffect(() => {
      const time = parseDate(props.modelValue, 'HH:mm');
      if (time) {
        // getHours() return 0-23, return 12 if 0
        setValue(time.getHours() % 12 || 12, 'hour');
        setValue(time.getMinutes(), 'minute');
        const period = formatDate(time, 'a');
        if (period) state.period = period;
      }
    });

    watchEffect(() => {
      const parsedDate = parseDate(
        `${state.hour}:${state.minute} ${state.period}`,
        'hh:mm a',
      );

      context.emit(
        'update:modelValue',
        parsedDate ? formatDate(parsedDate, 'HH:mm') : null,
      );
    });

    return {
      onChange,
      increment,
      decrement,
      ...toRefs(state),
    };
  },
});
</script>

<style src="./time-input.scss" lang="scss" scoped></style>
