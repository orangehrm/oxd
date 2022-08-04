<template>
  <div class="oxd-calendar-header" v-focus-first-element>
    <oxd-icon
      name="oxd-arrow-left"
      size="extra-small"
      class="oxd-calendar-header-arrow"
      @click="gotoPreviousMonth"
    ></oxd-icon>
    <ul class="oxd-calendar-selector">
      <oxd-calendar-dropdown class="oxd-calendar-selector-month">
        <div class="oxd-calendar-selector-month-selected">
          <oxd-text tag="p">{{ months[modelValue.month] }}</oxd-text>
          <oxd-icon name="caret-down-fill" :with-container="false" />
        </div>
        <template v-slot:content>
          <li
            role="none"
            class="oxd-calendar-selector --month"
            :class="{'--selected': index === modelValue.month}"
            v-for="(month, index) in months"
            :key="`oxd-month-${index}`"
            tabindex="0"
            @click="onSelectMonth(index)"
            @keyup.enter="onSelectMonth(index)"
          >
            {{ month }}
          </li>
        </template>
      </oxd-calendar-dropdown>
      <oxd-calendar-dropdown class="oxd-calendar-selector-year">
        <div class="oxd-calendar-selector-year-selected">
          <oxd-text tag="p">{{ modelValue.year }}</oxd-text>
          <oxd-icon name="caret-down-fill" :with-container="false" />
        </div>
        <template v-slot:content>
          <li
            role="none"
            class="oxd-calendar-selector --year"
            :class="{'--selected': year === modelValue.year}"
            v-for="(year, index) in years"
            :key="`oxd-year-${index}`"
            tabindex="0"
            @click="onSelectYear(year)"
            @keyup.enter="onSelectYear(year)"
          >
            {{ year }}
          </li>
        </template>
      </oxd-calendar-dropdown>
    </ul>
    <oxd-icon
      name="oxd-arrow-right"
      size="extra-small"
      class="oxd-calendar-header-arrow"
      @click="gotoNextMonth"
    ></oxd-icon>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Icon from '@orangehrm/oxd/core/components/Button/Icon.vue';
import CalendarDropdown from '@orangehrm/oxd/core/components/Calendar/CalendarDropdown.vue';
import focusFirstElementDirective from '../../../directives/focus-first-element';

export default defineComponent({
  name: 'oxd-calendar-controller',
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    years: {
      type: Array,
      required: true,
    },
    months: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  components: {
    'oxd-text': Text,
    'oxd-icon': Icon,
    'oxd-calendar-dropdown': CalendarDropdown,
  },
  directives: {
    'focus-first-element': focusFirstElementDirective,
  },
  methods: {
    calculateMonth(value: number) {
      const {month, year} = this.modelValue;
      if (month + value > 11 || month + value < 0) {
        return {
          month: month + value > 11 ? 0 : 11,
          year: year + value,
        };
      } else {
        return {
          month: month + value,
          year,
        };
      }
    },
    gotoPreviousMonth() {
      const {month, year} = this.calculateMonth(-1);
      this.$emit('update:modelValue', {
        month,
        year,
      });
    },
    gotoNextMonth() {
      const {month, year} = this.calculateMonth(1);
      this.$emit('update:modelValue', {
        month,
        year,
      });
    },
    onSelectYear(year: number) {
      this.$emit('update:modelValue', {
        month: this.modelValue.month,
        year,
      });
    },
    onSelectMonth(month: number) {
      this.$emit('update:modelValue', {
        month,
        year: this.modelValue.year,
      });
    },
  },
});
</script>
