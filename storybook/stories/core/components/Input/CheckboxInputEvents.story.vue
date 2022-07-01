<template>
  <div>
    <oxd-checkbox-input
      @focus="onFocus()"
      @blur="onBlur()"
      @change="onChange()"
      @onClick="onClick()"
      :modelValue="value"
      @update:modelValue="updatedValue(event)"
    >
    </oxd-checkbox-input>
    <br />
    <div style="margin-top: 2rem; margin-bottom: 2rem">
      <span v-if="FocusEvent">Focus Event Triggered</span>
      <span v-if="BlurEvent">Blur Event Triggered</span>
      <span v-if="ChangeEvent">Change Event Triggered</span>
      <span v-if="ClickEvent">Click Event Triggered</span>
    </div>
  </div>
</template>

<script>
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput';

export default {
  data() {
    return {
      FocusEvent: false,
      BlurEvent: false,
      ChangeEvent: false,
      ClickEvent: false,
    };
  },

  components: {
    'oxd-checkbox-input': CheckboxInput,
  },
  methods: {
    clearFields() {
      this.FocusEvent = false;
      this.BlurEvent = false;
      this.ChangeEvent = false;
      this.ClickEvent = false;
    },

    updatedValue(event) {
      this.clearFields();
    },

    onFocus() {
      this.clearFields();
      this.FocusEvent = true;
    },

    onBlur() {
      this.clearFields();
      this.BlurEvent = true;
    },

    onChange() {
      this.clearFields();
      this.ChangeEvent = true;
    },

    onClick() {
      this.clearFields();
      this.ClickEvent = true;
    },
  },
};
</script>
