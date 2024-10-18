<template>
  <div :class="strengthClass">
    <oxd-text class="password-strength-check" v-if="showStrength">
      {{ strengthLabel }}
    </oxd-text>
    <oxd-input
      v-bind="$attrs"
      class="oxd-password-input"
      :hasError="hasError"
      :disabled="disabled"
      :readonly="readonly"
      :type="isPasswordVisible ? 'text' : 'password'"
    ></oxd-input>
    <div
      :class="[
        'password-view-icon-container',
        {'password-visible': isPasswordVisible},
      ]"
      @click="togglePasswordVisibility"
    >
      <oxd-icon-button
        class="oxd-password-view-icon"
        :name="isPasswordVisible ? 'eye-slash-fill' : 'eye-fill'"
        :iconStyles="isPasswordVisible ? {color: 'white'} : {}"
        :tooltip="isPasswordVisible ? 'Hide Password' : 'Show Password'"
        size="large"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import oxdText from '@orangehrm/oxd/core/components/Text/Text.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';

export interface State {
  isPasswordVisible: boolean;
}

export default defineComponent({
  name: 'oxd-password-input',

  components: {
    'oxd-input': Input,
    'oxd-text': oxdText,
    'oxd-icon-button': IconButton,
  },
  props: {
    strength: {
      type: Number,
      default: -1,
      validator: (value: number) => value >= -1 && value <= 5,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data(): State {
    return {
      isPasswordVisible: false,
    };
  },

  computed: {
    strengthClass() {
      const strengthClasses = [
        'very-weak-strength',
        'weak-strength',
        'better-strength',
        'medium-strength',
        'strong-strength',
        'strongest-strength',
      ];

      if (
        this.strength == -1 ||
        this.hasError ||
        this.disabled ||
        this.readonly
      ) {
        return 'password-container';
      }

      return `password-container ${strengthClasses[this.strength]}`;
    },
    strengthLabel() {
      const strengthLabels = [
        'Very Weak',
        'Weak',
        'Better',
        'Medium',
        'Strong',
        'Strongest',
      ];
      return strengthLabels[this.strength];
    },
    showStrength(): boolean {
      return (
        this.strength !== -1 &&
        !this.hasError &&
        !this.disabled &&
        !this.readonly
      );
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
  },
});
</script>
<style src="./password-input.scss" lang="scss" scoped></style>
