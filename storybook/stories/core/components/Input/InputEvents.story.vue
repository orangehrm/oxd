<template>
  <div>
    <oxd-input
      @input="onInput()"
      @focus="onFocus()"
      @blur="onBlur()"
      @click="onClick()"
      @keyup="onKeyUp()"
    />
  </div>
  <div style="margin-top: 2rem">
    <span v-if="InputEvent">Input Event Triggered</span>
    <span v-if="FocusEvent">Focus Event Triggered</span>
    <span v-if="BlurEvent">Blur Event Triggered</span>
    <span v-if="ClickEvent">Click Event Triggered</span>
    <span v-if="KeyUpEvent">KeyUp Event Triggered</span>
  </div>
</template>

<script>
import Input from '@orangehrm/oxd/core/components/Input/Input';

export default {
  data() {
    return {
      InputEvent: false,
      FocusEvent: false,
      BlurEvent: false,
      ClickEvent: false,
      KeyUpEvent: false,
    };
  },

  components: {
    'oxd-input': Input,
  },
  methods: {
    clearFields() {
      this.InputEvent = false;
      this.FocusEvent = false;
      this.BlurEvent = false;
      this.ClickEvent = false;
      this.KeyUpEvent = false;
    },
    onInput() {
      this.clearFields();
      this.InputEvent = true;
    },
    onFocus() {
      this.clearFields();
      this.FocusEvent = true;
    },
    onBlur() {
      this.clearFields();
      this.BlurEvent = true;
    },
    onClick() {
      this.clearFields();
      this.ClickEvent = true;
    },
    onKeyUp() {
      this.clearFields();
      this.KeyUpEvent = true;
    },
  },
};
</script>
