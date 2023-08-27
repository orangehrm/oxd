<template>
  <oxd-number-input
    v-bind="$attrs"
    :style="{'max-width': '100px'}"
    :modelValue="modelValue"
    @update:model-value="onUpdateModelValue"
    @focus="onFocus()"
    @blur="onBlur()"
  />
  <br />
  <p>Selected value: {{ modelValue }}</p>
  <span>{{ isFocus ? 'Focus' : 'Blur' }} Event Triggered</span>
</template>

<script>
import Number from '@orangehrm/oxd/core/components/Input/Number/Number';

export default {
  data() {
    return {
      modelValue: 1,
      isFocus: false,
      blurEvent: true,
    };
  },
  components: {
    'oxd-number-input': Number,
  },
  methods: {
    onUpdateModelValue(value) {
      this.modelValue = value;
    },
    onFocus() {
      this.isFocus = true;
    },
    onBlur() {
      this.isFocus = false;
    },
  },
};
</script>
