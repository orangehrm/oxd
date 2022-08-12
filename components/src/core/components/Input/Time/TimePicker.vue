<template>
  <div
    role="alert"
    class="oxd-time-picker"
    @keyup.esc="onClose"
    v-click-outside="onClickOutside"
    v-focus-trap
    v-focus-first-element
  >
    <div class="oxd-time-hour-input">
      <oxd-icon-button
        name="chevron-up"
        class="oxd-time-hour-input-up"
        role="none"
        @click="increment(1, 'hour')"
        :withContainer="false"
      />
      <oxd-input
        :value="hour"
        inputmode="number"
        @keydown.up="increment(step, 'hour')"
        @keydown.down="decrement(step, 'hour')"
        @blur="onHourInputBlur()"
        @input="onInput($event, 'hour')"
        class="oxd-time-hour-input-text"
      />
      <oxd-icon-button
        name="chevron-down"
        class="oxd-time-hour-input-down"
        role="none"
        @click="decrement(1, 'hour')"
        :withContainer="false"
      />
    </div>
    <div class="oxd-time-separator">
      <span class="oxd-time-separator-icon">:</span>
    </div>
    <div class="oxd-time-minute-input">
      <oxd-icon-button
        name="chevron-up"
        class="oxd-time-minute-input-up"
        role="none"
        @click="increment(step, 'minute')"
        :withContainer="false"
      />
      <oxd-input
        :value="minute"
        @keydown.up="increment(step, 'minute')"
        @keydown.down="decrement(step, 'minute')"
        @blur="onMinuteInputBlur()"
        @input="onInput($event, 'minute')"
        class="oxd-time-minute-input-text"
      />
      <oxd-icon-button
        name="chevron-down"
        class="oxd-time-minute-input-down"
        role="none"
        @click="decrement(step, 'minute')"
        :withContainer="false"
      />
    </div>
    <div class="oxd-time-period-input">
      <div class="oxd-time-period-label">
        <input
          name="am"
          v-model="period"
          type="radio"
          value="AM"
          @keydown.enter.stop.prevent="togglePeriod"
        />
        <label for="am">{{ $vt('AM') }}</label>
      </div>
      <div class="oxd-time-period-label">
        <input
          name="pm"
          v-model="period"
          type="radio"
          value="PM"
          @keydown.enter.stop.prevent="togglePeriod"
        />
        <label for="pm">{{ $vt('PM') }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {parseDate, formatDate} from '@orangehrm/oxd/utils/date';
import {defineComponent, reactive, toRefs, watch} from 'vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import clickOutsideDirective from '@orangehrm/oxd/directives/click-outside';
import focusTrapDirective from '@orangehrm/oxd/directives/focus-trap';
import focusFirstElementDirective from '@orangehrm/oxd/directives/focus-first-element';
import translateMixin from '@orangehrm/oxd/mixins/translate';

interface State {
  hour: string;
  minute: string;
  period: string;
}

export default defineComponent({
  name: 'oxd-time-picker',

  props: {
    modelValue: {
      type: String,
    },
    step: {
      type: Number,
      default: 1,
    },
  },

  components: {
    'oxd-input': Input,
    'oxd-icon-button': IconButton,
  },

  mixins: [translateMixin],

  emits: ['update:modelValue', 'timepicker:closed'],

  directives: {
    'click-outside': clickOutsideDirective,
    'focus-trap': focusTrapDirective,
    'focus-first-element': focusFirstElementDirective,
  },

  setup(props, context) {
    let prevHour = '';
    let prevMinute = '';
    let enteredValue = '';
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
            // If input val is not a multiplier of step, get the nearest step value
            const minutes = (Math.round(input / props.step) * props.step) % 60;
            state.minute = minutes < 10 ? '0' + minutes : minutes.toString();
          }
        }
      }
    };

    const isValid = (input: string, type: string) => {
      let valid = true;
      const numericValue = parseInt(input);

      if (!isNaN(numericValue)) {
        if (type === 'hour') {
          valid = input > 0 && input <= 12;
        } else {
          valid = input >= 0 && input <= 59 && input % props.step === 0;
        }
      }

      return valid;
    };

    const onHourInputBlur = () => {
      const prevValue = prevHour;
      const newValue = isValid(enteredValue, 'hour') ? enteredValue : prevValue;
      prevMinute = newValue;

      if (newValue.length > 0) {
        setValue(parseInt(newValue, 10), 'hour');
      }
    };

    const onMinuteInputBlur = () => {
      const prevValue = prevMinute;
      const newValue = isValid(enteredValue, 'minute')
        ? enteredValue
        : prevValue;
      prevHour = newValue;
      if (newValue.length > 0) {
        setValue(parseInt(newValue, 10), 'minute');
      }
    };

    const getMin = (type: string) => {
      return type === 'hour' ? 1 : 0;
    };

    const getMax = (type: string) => {
      if (type === 'hour') {
        return 12;
      } else {
        return (Math.floor(59 / props.step) * props.step) % 60;
      }
    };

    const increment = (step: number, type: string) => {
      const max = getMax(type);
      const min = getMin(type);
      const input = parseInt(state[type]);
      const newValue = input + step > max ? min : input + step;
      setValue(newValue, type);
    };

    const decrement = (step: number, type: string) => {
      const max = getMax(type);
      const min = getMin(type);
      const input = parseInt(state[type]);
      const newValue = input - step < min ? max : input - step;
      setValue(newValue, type);
    };

    const onInput = e => {
      enteredValue = e.target.value.replace(/\D/g, '');
      if (enteredValue.length > 2) {
        enteredValue = enteredValue.substring(0, 2);
      }
    };

    const onClose = () => {
      context.emit('timepicker:closed');
    };

    const onClickOutside = (e: Event) => {
      e.stopPropagation();
      onClose();
    };

    const togglePeriod = () => {
      state.period = state.period === 'AM' ? 'PM' : 'AM';
    };

    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue) {
          const time = parseDate(props.modelValue, 'HH:mm');
          if (time) {
            // getHours() return 0-23, return 12 if 0
            setValue(time.getHours() % 12 || 12, 'hour');
            setValue(time.getMinutes(), 'minute');
            const period = formatDate(time, 'a');
            if (period) {
              state.period = period;
            }
          }
        }
      },
      {
        immediate: true,
      },
    );

    watch(
      () => state,
      () => {
        const timeString = `${state.hour}:${state.minute} ${state.period}`;
        if (timeString) {
          const parsedTime = parseDate(timeString, 'hh:mm a');
          if (parsedTime) {
            const formattedTime = formatDate(parsedTime, 'HH:mm');
            if (props.modelValue !== formattedTime) {
              context.emit('update:modelValue', formattedTime);
            }
          }
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    return {
      ...toRefs(state),
      increment,
      decrement,
      onClose,
      onInput,
      onClickOutside,
      togglePeriod,
      onHourInputBlur,
      onMinuteInputBlur,
    };
  },
});
</script>

<style src="./time-picker.scss" lang="scss" scoped></style>
