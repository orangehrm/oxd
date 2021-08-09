<template>
  <div v-click-outside="onFocusOut" class="oxd-time-wrapper">
    <div class="oxd-time-input">
      <oxd-input
        ref="oxdInput"
        :hasError="hasError"
        :disabled="disabled"
        :readonly="readonly"
        :value="timeDisplay"
        :placeholder="placeholder"
        @change="onTimeInput"
        @click="toggleDropdown"
      />
      <oxd-icon :class="timeIconClasses" name="clock" @click="toggleDropdown" />
    </div>
    <oxd-time-picker
      v-if="open"
      v-model="timeInput"
      :step="step"
    ></oxd-time-picker>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import clickOutsideDirective from '../../../../directives/click-outside';
import TimePicker from '@orangehrm/oxd/core/components/Input/Time/TimePicker.vue';
import {parseDate, formatDate} from '../../../../utils/date';

export default defineComponent({
  name: 'oxd-time-input',

  components: {
    'oxd-icon': Icon,
    'oxd-input': Input,
    'oxd-time-picker': TimePicker,
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

  directives: {
    'click-outside': clickOutsideDirective,
  },

  setup(props) {
    const state = reactive({
      open: false,
      timeInput: props.modelValue,
    });

    return {
      ...toRefs(state),
    };
  },

  methods: {
    onFocusOut() {
      if (this.open) {
        this.$emit('update:modelValue', this.timeInput);
        this.closeDropdown();
      }
    },
    onTimeInput($event: Event) {
      const input = ($event.target as HTMLInputElement).value;
      this.timeInput = formatDate(parseDate(input, 'hh:mm a'), 'HH:mm');
    },
    toggleDropdown() {
      if (!this.disabled) {
        if (!this.open) {
          this.$refs.oxdInput.$el.focus();
          this.openDropdown();
        } else {
          this.closeDropdown();
        }
      }
    },
    openDropdown() {
      this.open = true;
      this.$emit('timeselect:opened');
    },
    closeDropdown() {
      this.open = false;
      this.$emit('timeselect:closed');
    },
  },

  computed: {
    timeIconClasses(): object {
      return {
        'oxd-time-input--clock': true,
        '--disabled': this.disabled,
        '--readonly': this.readonly,
      };
    },
    timeDisplay(): string {
      return formatDate(parseDate(this.modelValue, 'HH:mm'), 'hh:mm a');
    },
  },
});
</script>

<style src="./time-input.scss" lang="scss" scoped></style>
