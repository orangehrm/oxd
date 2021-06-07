<template>
  <input
    :class="classes"
    :style="style"
    :value="modelValue"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export interface State {
  focused: boolean;
}

export default defineComponent({
  name: 'oxd-input',

  props: {
    // https://v3.vuejs.org/guide/migration/v-model.html#overview
    modelValue: {},
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },

  data(): State {
    return {
      focused: false,
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-input': true,
        'oxd-input--active': !this.focused,
        'oxd-input--focus': this.focused,
        'oxd-input--error': this.hasError,
      };
    },
  },

  methods: {
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    onInput(e: Event) {
      e.preventDefault();
      this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
      this.$emit('input', e);
    },
  },
});
</script>

<style src="./input.scss" lang="scss" scoped></style>
