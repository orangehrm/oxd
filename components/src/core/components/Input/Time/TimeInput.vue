<template>
  <div class="oxd-time-wrapper">
    <div class="oxd-time-input">
      <oxd-input
        ref="oxdInput"
        :hasError="hasError"
        :disabled="disabled"
        :readonly="readonly"
        :value="time"
        :placeholder="placeholder"
        @update:modelValue="onTimeChange"
        @blur="onBlur"
        tabindex="0"
        maxlength="5"
      />
      <div :class="amPmWrapperClasses" v-if="format == INPUT_TIME_FORMAT_12">
        <label :class="amPmLabelClasses"
          >{{ am ? $vt(TIME_PERIOD_AM) : $vt(TIME_PERIOD_PM) }}
          <input
            class="oxd-time-input-am-pm-checkbox"
            type="checkbox"
            @update:modelValue="onAmPmChange"
            @focus="onAmPmLabelFocus"
            @blur="onAmPmLabelBlur"
            @keydown.enter.stop.prevent="toggleAmPm"
            v-model="am"
            :readonly="readonly"
            :disabled="disabled"
          />
        </label>
      </div>
      <div
        class="oxd-time-input-icon-wrapper"
        tabindex="0"
        :class="timeIconWrapperClasses"
        v-if="!disabled"
        @click="toggleDropdown"
        @keyup.esc.prevent.stop="closeDropdown"
        @keyup.enter.prevent.stop="toggleDropdown"
      >
        <oxd-icon :class="timeIconClasses" name="clock" />
      </div>
    </div>
    <oxd-time-picker
      v-dropdown-direction
      v-if="timePickerOpen"
      v-model="pickerInput"
      :step="step"
      :format="format"
      :resetEnabled="resetEnabled"
      @update:modelValue="timePickerUpdate"
      @timepicker:closed="closeDropdown"
      @timepicker:reset="onReset"
    ></oxd-time-picker>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref, toRefs, watch} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import clickOutsideDirective from '@orangehrm/oxd/directives/click-outside';
import TimePicker from '@orangehrm/oxd/core/components/Input/Time/TimePicker.vue';
import {parseDate, formatDate} from '@orangehrm/oxd/utils/date';
import dropdownDirectionDirective from '@orangehrm/oxd/directives/dropdown-direction';
import translateMixin from '@orangehrm/oxd/mixins/translate';
import {
  TimeInputState,
  TIME_FORMAT_12_HR,
  TIME_FORMAT_24_HR,
  VALID_TIME_FORMAT_24,
  VALID_TIME_FORMAT_12,
  TIME_FORMAT_12_HR_WITH_PERIOD,
  TIME_PERIOD_AM,
  TIME_PERIOD_PM,
  INPUT_TIME_FORMAT_12,
  InputTimeFormat,
  INPUT_TIME_FORMATS,
  INPUT_TIME_FORMAT_24,
} from './types';

export default defineComponent({
  name: 'oxd-time-input',

  components: {
    'oxd-icon': Icon,
    'oxd-input': Input,
    'oxd-time-picker': TimePicker,
  },

  directives: {
    'click-outside': clickOutsideDirective,
    'dropdown-direction': dropdownDirectionDirective,
  },

  mixins: [translateMixin],

  emits: [
    'update:modelValue',
    'timeselect:opened',
    'timeselect:closed',
    'timepicker:reset',
    'blur',
  ],

  props: {
    modelValue: {
      type: String,
      default: '',
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'HH:MM',
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
  setup(props, context) {
    const timePickerOpen = ref<boolean>(false);
    const amPmLabelFocus = ref<boolean>(false);
    let inputTime = '';

    const parseFormat = computed(() => {
      return props.format == INPUT_TIME_FORMAT_24
        ? TIME_FORMAT_24_HR
        : TIME_FORMAT_12_HR_WITH_PERIOD;
    });

    const displayFormat = computed(() => {
      return props.format == INPUT_TIME_FORMAT_24
        ? TIME_FORMAT_24_HR
        : TIME_FORMAT_12_HR;
    });

    const state = reactive<TimeInputState>({
      time: '',
      pickerInput: props.modelValue,
      am: props.format == INPUT_TIME_FORMAT_12,
    });

    const openDropdown = () => {
      timePickerOpen.value = true;
      context.emit('timeselect:opened');
    };

    const closeDropdown = () => {
      timePickerOpen.value = false;
      context.emit('timeselect:closed');
    };

    const toggleDropdown = () => {
      if (!props.disabled) {
        if (!timePickerOpen.value) {
          openDropdown();
        } else {
          closeDropdown();
        }
      }
    };

    const onAmPmChange = (value: boolean) => {
      state.am = value;
    };

    const toggleAmPm = () => {
      state.am = !state.am;
    };

    const onTimeChange = (value: string) => {
      inputTime = value;
    };

    const onBlur = (e: Event) => {
      state.time = inputTime;
      e.stopImmediatePropagation();
      context.emit('blur');
    };

    const timePickerUpdate = () => {
      context.emit('update:modelValue', state.pickerInput);
    };

    const onReset = () => {
      state.time = '';
      context.emit('timepicker:reset');
    };

    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue) {
          const time = parseDate(props.modelValue, TIME_FORMAT_24_HR);
          if (time) {
            const formattedTime = formatDate(time, displayFormat.value);
            if (formattedTime) {
              state.time = formattedTime;
              inputTime = formattedTime;
              if (props.format == INPUT_TIME_FORMAT_12) {
                state.am = time.getHours() < 12;
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
      () => [state.time, state.am],
      () => {
        const validTimeFormat =
          props.format == INPUT_TIME_FORMAT_24
            ? VALID_TIME_FORMAT_24
            : VALID_TIME_FORMAT_12;
        const validTime = validTimeFormat.test(state.time);
        let newModelValue: string | null = state.time;
        if (props.format == INPUT_TIME_FORMAT_12) {
          newModelValue += ' ';
          newModelValue += state.am ? TIME_PERIOD_AM : TIME_PERIOD_PM;
        }

        if (validTime) {
          const parsedTime = parseDate(newModelValue, parseFormat.value);
          if (parsedTime) {
            newModelValue = formatDate(parsedTime, TIME_FORMAT_24_HR);
            state.pickerInput = newModelValue;
          }
        } else if (state.time === '') {
          newModelValue = '';
        }

        if (newModelValue !== props.modelValue) {
          context.emit('update:modelValue', newModelValue);
        }
      },
      {
        immediate: true,
      },
    );

    const timeIconClasses = computed(() => {
      return {
        'justify-center': true,
        'oxd-time-input-icon': true,
        'oxd-time-input--clock': true,
        '--disabled': props.disabled,
        '--readonly': props.readonly,
      };
    });

    const timeIconWrapperClasses = computed(() => {
      return {
        '--disabled': props.disabled,
        '--readonly': props.readonly,
      };
    });

    const amPmWrapperClasses = computed(() => {
      return {
        'oxd-time-input-am-pm-wrapper': props.format == INPUT_TIME_FORMAT_12,
        '--disabled': props.disabled,
      };
    });

    const amPmLabelClasses = computed(() => {
      return {
        'oxd-time-input-am-pm-label': true,
        '--focus': amPmLabelFocus.value,
      };
    });

    const onAmPmLabelFocus = () => {
      amPmLabelFocus.value = true;
    };

    const onAmPmLabelBlur = () => {
      amPmLabelFocus.value = false;
    };

    return {
      ...toRefs(state),
      timePickerOpen,
      toggleDropdown,
      timeIconClasses,
      timeIconWrapperClasses,
      amPmLabelClasses,
      onTimeChange,
      onBlur,
      onAmPmChange,
      toggleAmPm,
      timePickerUpdate,
      closeDropdown,
      onAmPmLabelFocus,
      onAmPmLabelBlur,
      amPmWrapperClasses,
      TIME_PERIOD_AM,
      TIME_PERIOD_PM,
      INPUT_TIME_FORMAT_12,
      onReset,
    };
  },
});
</script>

<style src="./time-input.scss" lang="scss" scoped></style>
