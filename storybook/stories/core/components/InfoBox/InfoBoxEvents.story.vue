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
    <oxd-infobox
      :infoLabel="'Current Stage of Recruitment'"
      :options="options"
      @input="onInput()"
      @focus="onFocus()"
      @click="(e) => e.preventDefault()"
      @keyup="onKeyUp()"
      @dropdown:opened="onDropDownOpen()"
      @dropdown:closed="onDropDownClosed()"
      @dropdown:blur="onDropDownBlur()"
      @dropdown:clear="onDropDownClear()"
      v-model="value"
      @update:modelValue="updatedValue(event)"
    >
    </oxd-infobox>
  </div>
</template>

<script>
import InfoBox from '@orangehrm/oxd/core/components/InfoBox/InfoBox';

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
      value: null,
      options: [
        {
          id: 2,
          label: 'Application Received',
        },
        {
          id: 3,
          label: 'Shortlisted',
        },
        {
          id: 4,
          label: 'In Progress',
        },
        {
          id: 5,
          label: 'Job Offer',
        },
        {
          id: 6,
          label: 'Hired',
          color: '#68a61d',
        },
        {
          id: 7,
          label: 'Rejected',
          color: '#eb0910',
        },
      ],
    };
  },

  components: {
    'oxd-infobox': InfoBox,
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
