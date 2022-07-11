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
        tabindex="0"
        maxlength="5"
      />
      <div class="oxd-time-input-am-pm-wrapper">
        <label :class="amPmLabelClasses"
          >{{ am ? 'AM' : 'PM' }}
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
      v-if="datePickerOpen"
      v-model="pickerInput"
      :step="step"
      @update:modelValue="timePickerUpdate"
      @timepicker:closed="closeDropdown"
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

  emits: [
    'update:modelValue',
    'timeselect:opened',
    'timeselect:closed',
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
      required: false,
    },
    step: {
      type: Number,
      default: 1,
    },
  },

  setup(props, context) {
    const datePickerOpen = ref<boolean>(false);
    const amPmLabelFocus = ref<boolean>(false);

    const state = reactive({
      time: '01:00',
      am: true,
      pickerInput: props.modelValue,
    });

    const openDropdown = () => {
      datePickerOpen.value = true;
      context.emit('timeselect:opened');
    };

    const closeDropdown = () => {
      datePickerOpen.value = false;
      context.emit('timeselect:closed');
    };

    const toggleDropdown = () => {
      if (!props.disabled) {
        if (!datePickerOpen.value) {
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
      state.time = value.trim();
    };

    const timePickerUpdate = () => {
      context.emit('update:modelValue', state.pickerInput);
    };

    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue) {
          const time = parseDate(props.modelValue, 'HH:mm');
          if (time) {
            const formattedTime = formatDate(time, 'hh:mm');
            if (formattedTime) {
              state.time = formattedTime;
              state.am = time.getHours() < 12;
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
        const validTime = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/.test(state.time);
        let newModelValue: string | null =
          state.time + ' ' + (state.am ? 'AM' : 'PM');
        if (validTime && newModelValue) {
          const parsedTime = parseDate(newModelValue, 'hh:mm a');
          if (parsedTime) {
            newModelValue = formatDate(parsedTime, 'HH:mm');
          }
        }
        if (newModelValue !== props.modelValue) {
          context.emit('update:modelValue', newModelValue);
        }
      },
      {
        immediate: true,
        deep: true,
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
      datePickerOpen,
      toggleDropdown,
      timeIconClasses,
      timeIconWrapperClasses,
      amPmLabelClasses,
      onTimeChange,
      onAmPmChange,
      toggleAmPm,
      timePickerUpdate,
      closeDropdown,
      onAmPmLabelFocus,
      onAmPmLabelBlur,
    };
  },
});
</script>

<style src="./time-input.scss" lang="scss" scoped></style>
