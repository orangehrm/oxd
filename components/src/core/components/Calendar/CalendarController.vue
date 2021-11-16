<!--
/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */
-->

<template>
  <div class="oxd-calendar-header">
    <oxd-icon name="chevron-left" @click="gotoPreviousMonth"></oxd-icon>
    <ul class="oxd-calendar-selector">
      <oxd-calendar-dropdown
        :options="months"
        :selected="currentMonth"
        @select="onSelectMonth"
        class="oxd-calendar-selector-month"
      >
        <div class="oxd-calendar-selector-month-selected">
          <oxd-text tag="p">{{ months[modelValue.month] }}</oxd-text>
          <oxd-icon name="caret-down-fill" :with-container="false" />
        </div>
      </oxd-calendar-dropdown>
      <oxd-calendar-dropdown
        :options="years"
        :selected="currentYear"
        @select="onSelectYear"
        class="oxd-calendar-selector-year"
      >
        <div class="oxd-calendar-selector-year-selected">
          <oxd-text tag="p">{{ modelValue.year }}</oxd-text>
          <oxd-icon name="caret-down-fill" :with-container="false" />
        </div>
      </oxd-calendar-dropdown>
    </ul>
    <oxd-icon name="chevron-right" @click="gotoNextMonth"></oxd-icon>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import Text from '@ohrm/oxd/core/components/Text/Text.vue';
import Icon from '@ohrm/oxd/core/components/Button/Icon.vue';
import CalendarDropdown from '@ohrm/oxd/core/components/Calendar/CalendarDropdown.vue';

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
        year: this.years[year],
      });
    },
    onSelectMonth(month: number) {
      this.$emit('update:modelValue', {
        month,
        year: this.modelValue.year,
      });
    },
  },
  computed: {
    currentMonth(): number {
      const {month} = this.modelValue;
      return month;
    },
    currentYear(): number {
      const {year} = this.modelValue;
      return this.years.findIndex(v => v === year);
    },
  },
});
</script>
