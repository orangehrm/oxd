<template>
  <div
    role="alert"
    class="oxd-time-picker"
    @keyup.esc="onClose"
    v-click-outside="onClickOutside"
    v-focus-trap
  >
    <div class="oxd-time-picker-reset-button" v-if="resetEnabled">
      <oxd-button
        iconName="oxd-refresh"
        :label="$vt('Reset')"
        size="small"
        iconSize="xx-small"
        display-type="text"
        @click="onReset"
      />
    </div>
    <div class="oxd-standard-time-picker" v-focus-first-element:return-focus>
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
      <div class="oxd-time-period-input" v-if="format == INPUT_TIME_FORMAT_12">
        <div class="oxd-time-period-label">
          <input
            name="am"
            v-model="period"
            type="radio"
            value="AM"
            @keydown.enter.stop.prevent="togglePeriod"
          />
          <label for="am">{{ $vt(TIME_PERIOD_AM) }}</label>
        </div>
        <div class="oxd-time-period-label">
          <input
            name="pm"
            v-model="period"
            type="radio"
            value="PM"
            @keydown.enter.stop.prevent="togglePeriod"
          />
          <label for="pm">{{ $vt(TIME_PERIOD_PM) }}</label>
        </div>
      </div>
    </div>
    <div class="oxd-time-picker-custom-slot">
      <slot name="timePickerBottom"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {formatDate, parseDate} from '@orangehrm/oxd/utils/date';
import {computed, defineComponent, reactive, toRefs, watch} from 'vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import clickOutsideDirective from '@orangehrm/oxd/directives/click-outside';
import focusTrapDirective from '@orangehrm/oxd/directives/focus-trap';
import focusFirstElementDirective from '@orangehrm/oxd/directives/focus-first-element';
import translateMixin from '@orangehrm/oxd/mixins/translate';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import {
  InputTimeFormat,
  INPUT_TIME_FORMATS,
  INPUT_TIME_FORMAT_12,
  INPUT_TIME_FORMAT_24,
  State,
  TIME_FORMAT_12_HR_WITH_PERIOD,
  TIME_FORMAT_24_HR,
  TIME_PERIOD_AM,
  TIME_PERIOD_PM,
} from './types';

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
    format: {
      type: String,
      default: INPUT_TIME_FORMAT_12,
      validator: (value: InputTimeFormat) => {
        return INPUT_TIME_FORMATS.indexOf(value) !== -1;
      },
    },
    resetEnabled: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    'oxd-input': Input,
    'oxd-icon-button': IconButton,
    'oxd-button': Button,
  },

  mixins: [translateMixin],

  emits: ['update:modelValue', 'timepicker:closed', 'timepicker:reset'],

  directives: {
    'click-outside': clickOutsideDirective,
    'focus-trap': focusTrapDirective,
    'focus-first-element': focusFirstElementDirective,
  },

  setup(props, context) {
    let enteredHour = '';
    let enteredMinute = '';
    const state: State = reactive({
      hour: '01',
      minute: '00',
      ...(props.format == INPUT_TIME_FORMAT_12 && {
        period: TIME_PERIOD_AM,
      }),
    });

    const parseFormat = computed(() => {
      return props.format == INPUT_TIME_FORMAT_24
        ? TIME_FORMAT_24_HR
        : TIME_FORMAT_12_HR_WITH_PERIOD;
    });

    const hoursMax = computed(() => {
      return props.format == INPUT_TIME_FORMAT_24 ? 23 : 12;
    });

    const hoursMin = computed(() => {
      return props.format == INPUT_TIME_FORMAT_24 ? 0 : 1;
    });

    const setValue = (input: number | null, type: string | null) => {
      if (input !== null && !isNaN(input) && type) {
        if (type === 'hour') {
          if (input >= hoursMin.value && input <= hoursMax.value) {
            state.hour = input < 10 ? '0' + input : input.toString();
          }
        } else {
          if (input >= 0 && input < 60) {
            // If input val is not a multiplier of step, get the nearest step value
            const minutes = (Math.round(input / props.step) * props.step) % 60;
            state.minute = minutes < 10 ? '0' + minutes : minutes.toString();
          }
        }
      } else if (input === null) {
        state.hour = '';
        state.minute = '';
      }
    };

    const isValid = (input: string, type: string) => {
      let valid = true;
      const numericValue = parseInt(input);

      if (!isNaN(numericValue)) {
        if (type === 'hour') {
          valid = input >= hoursMin.value && input <= hoursMax.value;
        } else {
          valid = input >= 0 && input <= 59 && input % props.step === 0;
        }
      }

      return valid;
    };

    const onHourInputBlur = () => {
      if (isValid(enteredHour, 'hour')) {
        setValue(parseInt(enteredHour, 10), 'hour');
      }
    };

    const onMinuteInputBlur = () => {
      if (isValid(enteredMinute, 'minute')) {
        setValue(parseInt(enteredMinute, 10), 'minute');
      }
    };

    const getMin = (type: string) => {
      return type === 'hour' && props.format == INPUT_TIME_FORMAT_12 ? 1 : 0;
    };

    const getMax = (type: string) => {
      if (type === 'hour') {
        return hoursMax.value;
      } else {
        return (Math.floor(59 / props.step) * props.step) % 60;
      }
    };

    const getDefaultValue = (type: string) => {
      if (type === 'hour') {
        state['minute'] = '00';
        return 1;
      } else {
        state['hour'] = '01';
        return 0;
      }
    };

    const increment = (step: number, type: string) => {
      if (state[type]) {
        const max = getMax(type);
        const min = getMin(type);
        const input = parseInt(state[type]);
        const newValue = input + step > max ? min : input + step;
        setValue(newValue, type);
      } else {
        setValue(getDefaultValue(type), type);
      }
    };

    const decrement = (step: number, type: string) => {
      if (state[type]) {
        const max = getMax(type);
        const min = getMin(type);
        const input = parseInt(state[type]);
        const newValue = input - step < min ? max : input - step;
        setValue(newValue, type);
      } else {
        setValue(getDefaultValue(type), type);
      }
    };

    const onInput = (e: Event, type: string) => {
      let inputValue = e.target.value.replace(/\D/g, '');
      if (inputValue.length > 2) {
        inputValue = inputValue.substring(0, 2);
      }
      if (type === 'hour') {
        enteredHour = inputValue;
      } else {
        enteredMinute = inputValue;
      }
    };

    const onReset = () => {
      setValue(null, null);
      context.emit('timepicker:reset');
    };

    const onClose = () => {
      context.emit('timepicker:closed');
    };

    const onClickOutside = (e: Event) => {
      e.stopPropagation();
      onClose();
    };

    const togglePeriod = () => {
      state.period =
        state.period === TIME_PERIOD_AM ? TIME_PERIOD_PM : TIME_PERIOD_AM;
    };

    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue) {
          const time = parseDate(props.modelValue, TIME_FORMAT_24_HR);
          if (time) {
            // getHours() return 0-23, return 12 if 0
            if (props.format == INPUT_TIME_FORMAT_24) {
              setValue(time.getHours(), 'hour');
              setValue(time.getMinutes(), 'minute');
            } else {
              setValue(time.getHours() % 12 || 12, 'hour');
              setValue(time.getMinutes(), 'minute');
              const period = formatDate(time, 'a');
              if (period) {
                state.period = period;
              }
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
        if (!state.hour && !state.minute) {
          context.emit('update:modelValue', '');
        } else {
          let timeString = `${state.hour}:${state.minute}`;
          if (props.format == INPUT_TIME_FORMAT_12) {
            timeString += ` ${state.period}`;
          }
          if (timeString) {
            const parsedTime = parseDate(timeString, parseFormat.value);
            if (parsedTime) {
              const formattedTime = formatDate(parsedTime, TIME_FORMAT_24_HR);
              if (props.modelValue !== formattedTime) {
                context.emit('update:modelValue', formattedTime);
              }
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
      TIME_PERIOD_PM,
      TIME_PERIOD_AM,
      INPUT_TIME_FORMAT_12,
      onReset,
    };
  },
});
</script>

<style src="./time-picker.scss" lang="scss" scoped></style>
