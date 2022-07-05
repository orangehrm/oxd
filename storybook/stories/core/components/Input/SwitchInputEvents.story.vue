<template>
  <div>
    <oxd-switch-input
      @focus="onFocus()"
      @blur="onBlur()"
      @change="onChange()"
      @onClick="onClick()"
      :modelValue="value"
      @update:modelValue="updatedValue($event)"
    >
    </oxd-switch-input>
    <br />
    <div style="margin-top: 2rem; margin-bottom: 2rem">
      <span v-if="FocusEvent">Focus Event Triggered</span>
      <span v-if="BlurEvent">Blur Event Triggered</span>
      <span v-if="ChangeEvent">Change Event Triggered</span>
      <span v-if="ClickEvent">Click Event Triggered</span>
      <br />
      <br />
      <span>Updated Value {{ value }}</span>
    </div>
  </div>
</template>

<script>
import SwitchInput from '@orangehrm/oxd/core/components/Input/SwitchInput';

export default {
  data() {
    return {
      FocusEvent: false,
      BlurEvent: false,
      ChangeEvent: false,
      ClickEvent: false,
      value: '',
    };
  },

  components: {
    'oxd-switch-input': SwitchInput,
  },
  methods: {
    clearFields() {
      this.FocusEvent = false;
      this.BlurEvent = false;
      this.ChangeEvent = false;
      this.ClickEvent = false;
    },

    updatedValue($event) {
      this.value = $event;
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
