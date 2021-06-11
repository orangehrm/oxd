<template>
  <div class="oxd-date-wrapper">
    <div class="oxd-date-input">
      <oxd-input
        :hasError="hasError"
        :disabled="disabled"
        :readonly="readonly"
        @blur="onBlur"
        @update:modelValue="onDateTyped"
        @click="toggleDropdown"
        :value="displayDate"
        :placeholder="placeholder"
        ref="oxdInput"
      />
      <div class="oxd-date-input-icon">
        <oxd-icon name="calendar" @click="toggleDropdown" />
      </div>
    </div>
    <transition name="transition-fade-down">
      <div v-if="open" class="oxd-date-input-calendar">
        <oxd-calendar
          v-bind="$attrs"
          @update:modelValue="onDateSelected"
          @mousedown.prevent
          v-model="dateSelected"
        ></oxd-calendar>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {formatDate, parseDate} from '../../../utils/date';
import {defineComponent, reactive, toRefs} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import Calendar from '@orangehrm/oxd/core/components/Calendar/Calendar.vue';

export default defineComponent({
  name: 'oxd-date-input',
  inheritAttrs: false,

  components: {
    'oxd-icon': Icon,
    'oxd-input': Input,
    'oxd-calendar': Calendar,
  },

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
    ioformat: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    displayFormat: {
      type: String,
      default: null,
    },
  },

  setup(props) {
    const state = reactive({
      open: false,
      dateProxy: parseDate(props.modelValue, props.ioformat),
      dateTyped: '',
    });

    return {
      ...toRefs(state),
    };
  },

  methods: {
    onBlur(e: Event) {
      if (this.dateTyped) {
        const format =
          this.displayFormat && this.displayFormat.trim() !== ''
            ? this.displayFormat
            : this.ioformat;
        const parsedDate = parseDate(this.dateTyped, format);
        this.dateTyped = '';
        this.dateSelected = parsedDate;
      }
      this.closeDropdown();
      e.stopPropagation();
      this.$emit('blur');
    },
    onDateTyped(value: string) {
      this.dateTyped = value ? value : ' ';
    },
    onDateSelected() {
      this.closeDropdown();
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
      this.$emit('dateselect:opened');
    },
    closeDropdown() {
      this.open = false;
      this.$emit('dateselect:closed');
    },
  },

  computed: {
    dateSelected: {
      get() {
        return parseDate(this.modelValue, this.ioformat);
      },
      set(value) {
        this.dateProxy = value;
        this.$emit('update:modelValue', formatDate(value, this.ioformat));
      },
    },
    displayDate(): string {
      return this.displayFormat && this.displayFormat.trim() !== ''
        ? formatDate(this.dateSelected, this.displayFormat)
        : formatDate(this.dateSelected, this.ioformat);
    },
  },
});
</script>

<style src="./date-input.scss" lang="scss" scoped></style>
