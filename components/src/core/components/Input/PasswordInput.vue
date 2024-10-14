<template>
  <div :class="strengthClass">
    <oxd-text class="password-strength-check" v-if="showStrength">{{
      strengthLabel
    }}</oxd-text>
    <div
      :class="[
        'password-view-icon-container',
        {'password-visible': isPasswordVisible},
      ]"
      @click="togglePasswordVisibility"
    >
      <oxd-icon
        :name="isPasswordVisible ? 'oxd-hide' : 'oxd-show'"
        class="oxd-password-view-icon"
      />
    </div>
    <oxd-input
      :type="isPasswordVisible ? 'text' : 'password'"
      class="password-input"
      v-bind="$attrs"
      :hasError="hasError"
      :disabled="disabled"
      :readonly="readonly"
      v-model="password"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import oxdText from '@orangehrm/oxd/core/components/Text/Text.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export interface State {
  showStrength: boolean;
  isPasswordVisible: boolean;
  password: string;
}

export default defineComponent({
  name: 'oxd-password-input',

  components: {
    'oxd-input': Input,
    'oxd-text': oxdText,
    'oxd-icon': Icon,
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
      password: '',
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
        this.readonly ||
        this.password.length > 64 ||
        this.password.length < 8 
      ) {
        this.showStrength = false;
        return 'password-container';
      }
      this.showStrength = true;
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
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
  },
});
</script>
<style src="./password-input.scss" lang="scss" scoped></style>

