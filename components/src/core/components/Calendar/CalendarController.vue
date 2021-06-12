<template>
  <div class="oxd-calendar-header">
    <oxd-icon name="chevron-left" @click="gotoPreviousMonth"></oxd-icon>
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
            v-for="(month, index) in months"
            :key="`oxd-month-${index}`"
            @click="onSelectMonth(index)"
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
            v-for="(year, index) in years"
            :key="`oxd-year-${index}`"
            @click="onSelectYear(year)"
          >
            {{ year }}
          </li>
        </template>
      </oxd-calendar-dropdown>
    </ul>
    <oxd-icon name="chevron-right" @click="gotoNextMonth"></oxd-icon>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Icon from '@orangehrm/oxd/core/components/Button/Icon.vue';
import CalendarDropdown from '@orangehrm/oxd/core/components/Calendar/CalendarDropdown.vue';

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
  components: {
    'oxd-text': Text,
    'oxd-icon': Icon,
    'oxd-calendar-dropdown': CalendarDropdown,
  },
  methods: {
    gotoPreviousMonth() {
      const {month, year} = this.modelValue;
      if (month - 1 < 0) {
        this.$emit('update:modelValue', {
          month: 11,
          year: year - 1,
        });
      } else {
        this.$emit('update:modelValue', {
          month: month - 1,
          year,
        });
      }
    },
    gotoNextMonth() {
      const {month, year} = this.modelValue;
      if (month + 1 > 11) {
        this.$emit('update:modelValue', {
          month: 0,
          year: year + 1,
        });
      } else {
        this.$emit('update:modelValue', {
          month: month + 1,
          year,
        });
      }
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
