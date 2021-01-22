<template>
  <input
    :class="classes"
    :style="style"
    :value="label"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script lang="ts">
export default {
  name: 'oxd-input',

  props: {
    label: {
      type: String,
      required: true,
    },
    style: {
      type: Object,
    },
  },

  data() {
    return {
      focused: false as boolean,
    };
  },

  computed: {
    classes() {
      return {
        'oxd-input': true,
        'oxd-input--active': !this.focused,
        'oxd-input--focus': this.focused,
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
};
</script>

<style src="./input.scss" lang="scss" scoped></style>
