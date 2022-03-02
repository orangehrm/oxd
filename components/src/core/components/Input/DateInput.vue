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
        @click="toggleDropdown"
        @keyup.esc="closeDropdown"
        @blur="onBlur"
      />
      <oxd-icon
        :class="dateIconClasses"
        name="calendar"
        tabindex="0"
        @click="toggleDropdown"
        @keyup.enter.prevent.stop="toggleDropdown"
      />
    </div>
    <transition name="transition-fade-down">
      <div
          v-if="open"
          class="oxd-date-input-calendar"

          @keyup.esc="closeDropdown"
      >
        <oxd-calendar
          v-bind="$attrs"
          @update:modelValue="onDateSelected"
          @mousedown.prevent
          v-model="dateSelected"
        >
          <div class="oxd-date-input-links">
            <div @keyup.enter="onClickToday" @click="onClickToday" class="oxd-date-input-link --today" tabindex="0">
              Today
            </div>
            <div @keyup.enter="onClickClear" @click="onClickClear" class="oxd-date-input-link --clear" tabindex="0">
              Clear
            </div>
            <div @keyup.enter="closeDropdown" @click="closeDropdown" class="oxd-date-input-link --close" tabindex="0">
              Close
            </div>
          </div>
        </oxd-calendar>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {formatDate, parseDate, freshDate} from '../../../utils/date';
import {defineComponent, reactive, toRefs} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import Calendar from '@orangehrm/oxd/core/components/Calendar/Calendar.vue';
// import clickOutsideDirective from '../../../directives/click-outside';

export default defineComponent({
  name: 'oxd-date-input',
  inheritAttrs: false,

  components: {
    'oxd-icon': Icon,
    'oxd-input': Input,
    'oxd-calendar': Calendar,
  },

  // directives: {
  //   'click-outside': clickOutsideDirective,
  // },

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
      const calendarDropdown = (e.target as Element).parentElement?.nextElementSibling;
      if(calendarDropdown === document.querySelector('.oxd-date-input-calendar')){
        return;
      }
      this.closeDropdown(null);
      e.stopImmediatePropagation();
      this.$emit('blur');
    },
    onDateTyped(value: string) {
      this.dateTyped = value ? value : ' ';
    },
    onDateSelected() {
      this.closeDropdown(null);
    },
    toggleDropdown() {
      if (!this.disabled && !this.readonly) {
        if (!this.open) {
          this.$refs.oxdInput.$el.focus();
          this.openDropdown();
        } else {
          this.closeDropdown(null);
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
      this.$emit('dateselect:closed');
    },
    onClickToday() {
      this.dateSelected = freshDate();
      this.open = false;
    },
    onClickClear() {
      this.dateSelected = null;
      this.open = false;
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
    dateIconClasses(): object {
      return {
        'oxd-date-input-icon': true,
        '--disabled': this.disabled,
        '--readonly': this.readonly,
      };
    },
  },
});
</script>

<style src="./date-input.scss" lang="scss" scoped></style>
