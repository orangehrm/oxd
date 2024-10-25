<template>
  <div :class="strengthClass">
    <oxd-text class="password-strength-check" v-if="showStrength">
      {{ strengthLabel }}
    </oxd-text>
    <oxd-input
      v-bind="$attrs"
      class="password-input"
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
import {defineComponent, ref, computed} from 'vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import oxdText from '@orangehrm/oxd/core/components/Text/Text.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import useTranslate from '@orangehrm/oxd/composables/useTranslate';

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
      validator: (value: number) => [-1, 0, 1, 2, 3, 4, 5].includes(value),
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
    hasMinimumPasswordStrength: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    // Reactive reference for password visibility
    const isPasswordVisible = ref(false);
    const {$t} = useTranslate();

    // Computed properties for strengthClass, strengthLabel, and showStrength
    const strengthClass = computed(() => {
      const strengthClasses = [
        'very-weak-strength',
        'weak-strength',
        'better-strength',
        'medium-strength',
        'strong-strength',
        'strongest-strength',
      ];

      if (!props.hasMinimumPasswordStrength) {
        return 'password-container below-minimum-strength';
      }

      if (
        props.strength === -1 ||
        props.hasError ||
        props.disabled ||
        props.readonly
      ) {
        return 'password-container';
      }

      return `password-container ${strengthClasses[props.strength]}`;
    });

    const strengthLabel = computed(() => {
      const strengthLabels = [
        'Very Weak',
        'Weak',
        'Better',
        'Medium',
        'Strong',
        'Strongest',
      ];
      return $t(strengthLabels[props.strength]);
    });

    const showStrength = computed(() => {
      if (!props.hasMinimumPasswordStrength && props.strength !== -1) {
        return true;
      }
      return (
        props.strength !== -1 &&
        !props.hasError &&
        !props.disabled &&
        !props.readonly
      );
    });

    // Method to toggle password visibility
    const togglePasswordVisibility = () => {
      isPasswordVisible.value = !isPasswordVisible.value;
    };

    return {
      isPasswordVisible,
      strengthClass,
      strengthLabel,
      showStrength,
      togglePasswordVisibility,
    };
  },
});
</script>
<style src="./password-input.scss" lang="scss" scoped></style>
