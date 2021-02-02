<template>
  <input :class="classes" :style="style" @focus="onFocus" @blur="onBlur" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export interface State {
  focused: boolean;
}

export default defineComponent({
  name: 'oxd-input',

  props: {
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
    onFocus(e: Event) {
      this.focused = true;
      this.$emit('focus', e);
    },
    onBlur(e: Event) {
      this.focused = false;
      this.$emit('blur', e);
    },
  },
});
</script>

<style src="./input.scss" lang="scss" scoped></style>
