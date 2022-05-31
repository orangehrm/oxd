<template>
  <div>
    <div style="margin-top: 2rem; margin-bottom: 2rem">
      <span v-if="InputEvent">Input Event Triggered</span>
      <span v-if="FocusEvent">Focus Event Triggered</span>
      <span v-if="ClickEvent">Click Event Triggered</span>
      <span v-if="KeyUpEvent">KeyUp Event Triggered</span>
      <span v-if="DropDownOpen">DropDownOpen Event Triggered</span>
      <span v-if="DropDownClosed">DropDownClosed Event Triggered</span>
      <span v-if="DropDownBlur">DropDownBlur Event Triggered</span>
      <span v-if="DropDownClear">DropDownClear Event Triggered</span>
    </div>
    <div>
      <span v-if="value">Value Selected : {{ value }}</span>
    </div>
    <oxd-multiselect-input
      :options="options"
      @input="onInput()"
      @focus="onFocus()"
      @click="onClick()"
      @keyup="onKeyUp()"
      v-model="value"
      @dropdown:opened="onDropDownOpen()"
      @dropdown:closed="onDropDownClosed()"
      @dropdown:blur="onDropDownBlur()"
      @dropdown:clear="onDropDownClear()"
      @update:modelValue="updatedValue(event)"
    >
    </oxd-multiselect-input>
  </div>
</template>

<script>
import MultiSelectInput from '@orangehrm/oxd/core/components/Input/MultiSelect/MultiSelectInput';

export default {
  data() {
    return {
      InputEvent: false,
      FocusEvent: false,
      ClickEvent: false,
      KeyUpEvent: false,
      DropDownOpen: false,
      DropDownClosed: false,
      DropDownBlur: false,
      DropDownClear: false,
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
    'oxd-multiselect-input': MultiSelectInput,
  },
  methods: {
    clearFields() {
      this.InputEvent = false;
      this.FocusEvent = false;
      this.ClickEvent = false;
      this.KeyUpEvent = false;
      this.DropDownOpen = false;
      this.DropDownClosed = false;
      this.DropDownBlur = false;
      this.DropDownClear = false;
    },

    updatedValue(event) {
      this.clearFields();
    },
    onInput() {
      this.clearFields();
      this.InputEvent = true;
    },
    onFocus() {
      this.clearFields();
      this.FocusEvent = true;
    },
    onClick() {
      this.clearFields();
      this.ClickEvent = true;
    },
    onKeyUp() {
      this.clearFields();
      this.KeyUpEvent = true;
    },
    onDropDownOpen() {
      this.clearFields();
      this.DropDownOpen = true;
    },
    onDropDownClosed() {
      this.clearFields();
      this.DropDownClosed = true;
    },
    onDropDownBlur() {
      this.clearFields();
      this.DropDownBlur = true;
    },
    onDropDownClear() {
      this.clearFields();
      this.DropDownClear = true;
    },
  },
};
</script>
