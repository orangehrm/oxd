<template>
  <div>
    <div style="margin-top: 2rem; margin-bottom: 2rem">
      <span v-if="FocusEvent">Focus Event Triggered</span>
      <span v-if="ClickEvent">Click Event Triggered</span>
      <span v-if="DateOpen">Date opened Event Triggered</span>
      <span v-if="DateClosed">Date close Event Triggered</span>
      <span v-if="DropDownBlur">Blur Event Triggered</span>
      <span v-if="SelectMonth">Select Month Event Triggered</span>
      <span v-if="SelectYear">Select Year Event Triggered</span>
    </div>
    <div>
      <span v-if="value">Value Selected : {{ value }}</span>
    </div>
    <oxd-date-input
      @focus="onFocus()"
      @click="onClick()"
      v-model="value"
      @dateselect:opened="onDateOpen()"
      @dateselect:closed="onDateClosed()"
      @blur="onDropDownBlur()"
      @selectMonth="onSelectMonth()"
      @selectYear="onSelectYear()"
      @update:modelValue="updatedValue(event)"
    >
    </oxd-date-input>
  </div>
</template>

<script>
import DateInput from '@orangehrm/oxd/core/components/Input/DateInput';

export default {
  data() {
    return {
      FocusEvent: false,
      ClickEvent: false,
      DateOpen: false,
      DateClosed: false,
      DropDownBlur: false,
      SelectMonth: false,
      SelectYear: false,
      value: [],
      options: [
        {id: 1, label: 'HR Admin'},
        {id: 2, label: 'ESS User'},
        {id: 3, label: 'Supervisor'},
        {
          id: 5,
          label: 'Employee',
        },
        {
          id: 6,
          label: 'Assistant Manager',
        },
        {
          id: 7,
          label: 'Director',
        },
        {
          id: 8,
          label: 'Officer',
        },
        {
          id: 9,
          label: 'Appraiser',
        },
        {
          id: 10,
          label: 'Senior Executive',
        },
      ],
    };
  },

  components: {
    'oxd-date-input': DateInput,
  },
  methods: {
    clearFields() {
      this.FocusEvent = false;
      this.ClickEvent = false;
      this.DateOpen = false;
      this.DateClosed = false;
      this.DropDownBlur = false;
      this.SelectMonth = false;
      this.SelectYear = false;
    },

    updatedValue(event) {
      this.clearFields();
    },
    onFocus() {
      this.clearFields();
      this.FocusEvent = true;
    },
    onClick() {
      this.clearFields();
      this.ClickEvent = true;
    },
    onDateOpen() {
      this.clearFields();
      this.DateOpen = true;
    },
    onDateClosed() {
      this.clearFields();
      this.DateClosed = true;
    },
    onDropDownBlur() {
      this.clearFields();
      this.DropDownBlur = true;
    },
    onSelectMonth() {
      this.clearFields();
      this.SelectMonth = true;
    },
    onSelectYear() {
      this.clearFields();
      this.SelectYear = true;
    },
  },
};
</script>
