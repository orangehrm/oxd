<template>
  <div>
    <oxd-segments
      @focus="onFocus()"
      @blur="onBlur()"
      @change="onChange()"
      @onClick="onClick()"
      :options="options"
      v-model="modelValue"
      @update:modelValue="updatedValue(event)"
    >
    </oxd-segments>
    <br />
    <div>
      <span v-if="modelValue">Value Selected : {{ modelValue }}</span>
    </div>
    <div style="margin-top: 2rem; margin-bottom: 2rem">
      <span v-if="FocusEvent">Focus Event Triggered</span>
      <span v-if="BlurEvent">Blur Event Triggered</span>
      <span v-if="ChangeEvent">Change Event Triggered</span>
      <span v-if="ClickEvent">Click Event Triggered</span>
    </div>
  </div>
</template>

<script>
import Segments from '@orangehrm/oxd/core/components/Segments/Segments';

export default {
  data() {
    return {
      FocusEvent: false,
      BlurEvent: false,
      ChangeEvent: false,
      ClickEvent: false,
      modelValue: {},
      options: [
      {
        id: 1,
        label: 'Single Assign',
      },
      {
        id: 2,
        label: 'Bulk Assign',
      },
      ],
    };
  },

  components: {
    'oxd-segments': Segments,
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
