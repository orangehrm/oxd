<template>
  <div class="oxd-date-wrapper">
    <div class="oxd-date-input">
      <oxd-input
        :hasError="hasError"
        :disabled="disabled"
        :readonly="readonly"
        :value="displayDate"
        :placeholder="placeholder"
        ref="oxdInput"
        @update:modelValue="onDateTyped"
        @blur="onBlur"
      />
      <oxd-icon
        :class="dateIconClasses"
        name="calendar"
        tabindex="0"
        ref="oxdIcon"
        @click="toggleDropdown"
        @keyup.enter.prevent.stop="toggleDropdown"
      />
    </div>
    <transition name="transition-fade-down">
      <div
        v-click-outside="closeDropdown"
        v-if="open"
        class="oxd-date-input-calendar"
        @keyup.esc="closeDropdown"
        v-dropdown-direction
      >
        <oxd-calendar
          v-bind="$attrs"
          @update:modelValue="onDateSelected"
          @mousedown.prevent
          v-model="dateSelected"
          :locale="locale"
        >
          <div class="oxd-date-input-links">
            <div
              @keyup.enter="onClickToday"
              @click="onClickToday"
              class="oxd-date-input-link --today"
              tabindex="0"
            >
              Today
            </div>
            <div
              @keyup.enter="onClickClear"
              @click="onClickClear"
              class="oxd-date-input-link --clear"
              tabindex="0"
            >
              Clear
            </div>
            <div
              @keyup.enter="closeDropdown"
              @click="closeDropdown"
              class="oxd-date-input-link --close"
              tabindex="0"
            >
              Close
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
import {formatDate, parseDate, freshDate} from '../../../utils/date';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import Calendar from '@orangehrm/oxd/core/components/Calendar/Calendar.vue';
import clickOutsideDirective from '../../../directives/click-outside';
import dropdownDirectionDirective from '../../../directives/dropdown-direction';

export default defineComponent({
  name: 'oxd-date-input',
  inheritAttrs: false,

  components: {
    'oxd-icon': Icon,
    'oxd-input': Input,
    'oxd-calendar': Calendar,
  },

  directives: {
    'click-outside': clickOutsideDirective,
    'dropdown-direction': dropdownDirectionDirective,
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
      }
      e.stopImmediatePropagation();
      this.$emit('blur');
    },
    onDateTyped(value: string) {
      this.dateTyped = value;
    },
    onDateSelected() {
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
      if ($e && $e.key === 'Escape') $e.stopPropagation();
      this.open = false;
      this.$refs.oxdIcon.$el.focus();
      this.$emit('dateselect:closed');
    },
    onClickToday() {
      this.dateSelected = freshDate();
      this.open = false;
      this.$refs.oxdIcon.$el.focus();
    },
    onClickClear() {
      this.dateTyped = '';
      this.dateSelected = null;
      this.open = false;
      this.$refs.oxdIcon.$el.focus();
    },
  },

  computed: {
    dateSelected: {
      get() {
        return parseDate(this.modelValue, this.ioformat);
      },
      set(value) {
        this.$emit(
          'update:modelValue',
          formatDate(value, this.ioformat) || this.dateTyped,
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
        'oxd-date-input-icon': true,
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
