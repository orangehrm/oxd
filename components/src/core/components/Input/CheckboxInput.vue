<template>
  <div class="oxd-checkbox-wrapper">
    <label>
      <input
        type="checkbox"
        :value="modelValue"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        v-bind="$attrs"
        :true-value="trueValue"
        :false-value="falseValue"
      />
      <span :class="classes" :style="style" class="oxd-checkbox-input">
        <oxd-icon class="oxd-checkbox-input-icon" :name="checkIcon" />
      </span>
      {{ optionLabel }}
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export interface State {
  focused: boolean;
}

export default defineComponent({
  name: 'oxd-input',
  inheritAttrs: false,
  props: {
    modelValue: {},
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    checkIcon: {
      type: String,
      default: 'check',
    },
    optionLabel: {
      type: String,
      default: '',
    },
    trueValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    falseValue: {
      type: [Boolean, String, Number],
      default: false,
    },
  },

  components: {
    'oxd-icon': Icon,
  },

  data(): State {
    return {
      focused: false,
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-checkbox-input': true,
        'oxd-checkbox-input--active': !this.focused,
        'oxd-checkbox-input--focus': this.focused,
        'oxd-checkbox-input--error': this.hasError,
      };
    },
  },

  methods: {
    onFocus(e: Event) {
      this.focused = true;
      this.$emit('focus', e);
    },
    onBlur(e: Event) {
      this.focused = false;
      this.$emit('blur', e);
    },
    onInput(e: Event) {
      const emitValue = (e.target as HTMLInputElement).checked
        ? this.trueValue
        : this.falseValue;
      e.preventDefault();
      this.$emit('update:modelValue', emitValue);
      this.$emit('input', e);
    },
  },
});
</script>

<style src="./checkbox-input.scss" lang="scss" scoped></style>
