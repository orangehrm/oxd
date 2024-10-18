<template>
  <div :class="strengthClass">
    <oxd-text class="password-strength-check" v-if="showStrength">{{
      strengthLabel
    }}</oxd-text>
    <oxd-input
      :type="isPasswordVisible ? 'text' : 'password'"
      class="password-input"
      v-bind="$attrs"
      :hasError="hasError"
      :disabled="disabled"
      :readonly="readonly"
    />
    <div
      :class="[
        'password-view-icon-container',
        {'password-visible': isPasswordVisible},
      ]"
      @click="togglePasswordVisibility"
    >
      <oxd-icon-button
        :name="isPasswordVisible ? 'eye-slash-fill' : 'eye-fill'"
        class="oxd-password-view-icon"
        :iconStyles="isPasswordVisible ? {color: 'white'} : {}"
        size="large"
        :tooltip="isPasswordVisible ? 'Hide Password' : 'Show Password'"
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
  showStrength: boolean;
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
      showStrength: true,
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
  },
  watch: {
    strength() {
      this.updateShowStrength();
    },
    hasError() {
      this.updateShowStrength();
    },
    disabled() {
      this.updateShowStrength();
    },
    readonly() {
      this.updateShowStrength();
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    updateShowStrength() {
      this.showStrength =
        this.strength !== -1 &&
        !this.hasError &&
        !this.disabled &&
        !this.readonly;
    },
  },
  mounted() {
    this.updateShowStrength();
  },
});
</script>
<style src="./password-input.scss" lang="scss" scoped></style>
