<template>
  <div class="oxd-date-wrapper">
    <div
      class="oxd-date-input"
      :tooltip="isLengthyDate ? displayDate : null"
      flow="bottom"
    >
      <oxd-input
        :hasError="hasError"
        :disabled="disabled"
        :readonly="readonly"
        :value="displayDate"
        :placeholder="placeholder"
        v-bind="defaultAttrs"
        v-click-outside="onClickTextOutside"
        ref="oxdInput"
        @update:modelValue="onDateTyped"
        @blur="onBlur"
      />
      <div
        class="oxd-date-input-icon-wrapper"
        tabindex="0"
        :class="dateIconAttributeClasses"
        v-if="!disabled"
        ref="oxdIcon"
        @click="toggleDropdown"
        @keyup.enter.prevent.stop="toggleDropdown"
      >
        <oxd-icon :class="dateIconClasses" name="oxd-calendar" size="small" />
      </div>
    </div>
    <transition name="transition-fade-down">
      <div
        v-click-outside="onClickOutside"
        v-if="open"
        class="oxd-date-input-calendar"
        @keyup.esc="closeDropdown"
        v-dropdown-direction
      >
        <oxd-calendar
          @update:modelValue="onDateSelected"
          @selectMonth="selectMonth"
          @selectYear="selectYear"
          @mousedown.prevent
          v-model="dateSelected"
          :locale="locale"
          :firstDayOfWeek="firstDayOfWeek"
          :years="years"
          :monthFormat="monthFormat"
          :months="months"
          :dayFormat="dayFormat"
          :days="days"
          :dayAttributes="dayAttributes"
          :events="events"
          :min="min"
          :max="max"
          v-focus-trap
        >
          <div class="oxd-date-input-links">
            <div
              @keyup.enter="onClickToday"
              @click="onClickToday"
              class="oxd-date-input-link --today"
              tabindex="0"
            >
              {{ $vt('Today') }}
            </div>
            <div
              @keyup.enter="onClickClear"
              @click="onClickClear"
              class="oxd-date-input-link --clear"
              tabindex="0"
            >
              {{ $vt('Clear') }}
            </div>
            <div
              @keyup.enter="closeDropdown"
              @click="closeDropdown"
              class="oxd-date-input-link --close"
              tabindex="0"
            >
              {{ $vt('Close') }}
            </div>
          </div>
        </oxd-calendar>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {enUS} from 'date-fns/locale';
import {defineComponent, PropType} from 'vue';
import {
  formatDate,
  parseDate,
  freshDate,
  getYear,
  isAfter,
  isBefore,
  isEqual,
} from '../../../utils/date';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import Calendar from '@orangehrm/oxd/core/components/Calendar/Calendar.vue';
import clickOutsideDirective from '../../../directives/click-outside';
import dropdownDirectionDirective from '../../../directives/dropdown-direction';
import focusTrapDirective from '../../../directives/focus-trap';
import translateMixin from '../../../mixins/translate';
import {LENGTHY_DATE_FORMATS} from '../Calendar/types';
import {CalendarDayAttributes, CalendarEvent} from '../Calendar/types';

export default defineComponent({
  name: 'oxd-date-input',
  inheritAttrs: false,

  components: {
    'oxd-icon': Icon,
    'oxd-input': Input,
    'oxd-calendar': Calendar,
  },

  mixins: [translateMixin],

  directives: {
    'click-outside': clickOutsideDirective,
    'dropdown-direction': dropdownDirectionDirective,
    'focus-trap': focusTrapDirective,
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
    locale: {
      type: Object as PropType<Locale>,
      default: enUS,
    },
    firstDayOfWeek: {
      type: Number,
      default: 0, // 0 | 1 | 2 | 3 | 4 | 5 | 6 => 0 represents Sunday
    },
    years: {
      type: Array,
      default: () => {
        return Array.from(
          {length: getYear(new Date()) - 1969},
          (_, i) => 1970 + i,
        );
      },
    },
    monthFormat: {
      type: String,
      default: 'wide',
    },
    months: {
      type: Array,
      default: () => [],
    },
    dayFormat: {
      type: String,
      default: 'narrow',
    },
    days: {
      type: Array,
      default: () => [],
    },
    dayAttributes: {
      type: Array as PropType<CalendarDayAttributes[]>,
      default: () => [],
    },
    events: {
      type: Array as PropType<CalendarEvent[]>,
      default: () => [],
    },
    min: {
      type: Date,
    },
    max: {
      type: Date,
    },
  },

  data() {
    return {
      open: false,
      dateTyped: null,
    };
  },

  methods: {
    onBlur(e: Event) {
      if (this.dateTyped !== null) {
        this.dateSelected = parseDate(this.dateTyped, this.format, {
          locale: this.locale,
        });
        if (!this.nonDisabledDate(parseDate(this.dateTyped, this.format))) {
          this.dateTyped = null;
          this.dateSelected = null;
        }
      }
      e.stopImmediatePropagation();
      this.$emit('blur');
    },
    onDateTyped(value: string) {
      this.dateTyped = value;
    },
    onDateSelected() {
      this.dateTyped = null;
      const oxdDatePicker = this.$refs.oxdInput;
      this.$nextTick(() => {
        const oxdDateInputTriggerBtn = this.$refs.oxdIcon;
        oxdDateInputTriggerBtn.blur();
        const inputElement = oxdDatePicker.$el.querySelectorAll('input');
        inputElement[0]?.focus();
      });
      this.closeDropdown();
    },
    toggleDropdown() {
      if (!this.disabled && !this.readonly) {
        if (!this.open) {
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
    closeDropdown($e: KeyboardEvent | null) {
      if ($e && $e.key === 'Escape' && this.open) $e.stopPropagation();
      this.open = false;
      this.$refs.oxdIcon.focus();
      this.$emit('dateselect:closed');
    },
    onClickOutside() {
      this.open = false;
      this.$emit('dateselect:closed');
    },
    onClickTextOutside() {
      const oxdDatePicker = this.$refs.oxdInput;
      oxdDatePicker.focused = false;
    },
    onClickToday() {
      if (!this.nonDisabledDate(freshDate())) {
        this.dateTyped = null;
        this.dateSelected = null;
      } else {
        this.dateSelected = freshDate();
      }

      this.open = false;
      this.$refs.oxdIcon.focus();
    },
    onClickClear() {
      this.dateTyped = '';
      this.dateSelected = null;
      this.open = false;
      this.$refs.oxdIcon.focus();
    },
    selectMonth($e: Event) {
      this.$emit('selectMonth', $e);
    },
    selectYear($e: Event) {
      this.$emit('selectYear', $e);
    },
    nonDisabledDate(value: Date): boolean {
      if (
        isAfter(
          formatDate(value, 'yyyy-MM-dd'),
          formatDate(this.max, 'yyyy-MM-dd'),
          'yyyy-MM-dd',
        ) ||
        isBefore(
          formatDate(value, 'yyyy-MM-dd'),
          formatDate(this.min, 'yyyy-MM-dd'),
          'yyyy-MM-dd',
        ) ||
        isEqual(value, this.max)
      ) {
        return false;
      } else {
        return true;
      }
    },
  },

  computed: {
    defaultAttrs() {
      const notAllowed = ['onUpdate:modelValue'];
      return Object.keys(this.$attrs)
        .filter(key => !notAllowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = this.$attrs[key];
          return obj;
        }, {});
    },
    isLengthyDate() {
      return LENGTHY_DATE_FORMATS.indexOf(this.format) > -1;
    },
    dateSelected: {
      get() {
        return parseDate(this.modelValue, this.ioformat);
      },
      set(value) {
        this.$emit(
          'update:modelValue',
          formatDate(value, this.ioformat) ||
            (this.dateTyped ? this.dateTyped : null),
        );
      },
    },
    displayDate(): string {
      return (
        formatDate(this.dateSelected, this.format, {locale: this.locale}) ||
        this.dateTyped
      );
    },
    dateIconClasses(): object {
      return {
        'justify-center': true,
        'oxd-date-input-icon': true,
        '--disabled': this.disabled,
        '--readonly': this.readonly,
      };
    },
    dateIconAttributeClasses(): object {
      return {
        '--disabled': this.disabled,
        '--readonly': this.readonly,
      };
    },
    format(): string {
      return this.displayFormat && this.displayFormat.trim()
        ? this.displayFormat
        : this.ioformat;
    },
  },
});
</script>

<style src="./date-input.scss" lang="scss" scoped></style>
