<template>
  <div>
    <input
      :class="classes"
      :style="style"
      :value="label"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script>
export default {
  name: "oxd-input",

  props: {
    label: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
    },
  },

  data() {
    return {
      focused: false,
    };
  },

  computed: {
    classes() {
      return {
        "oxd-input": true,
        "oxd-input--active": !this.focused,
        "oxd-input--focus": this.focused,
      };
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
  },

  methods: {
    onFocus() {
      this.focused = true;
      this.$emit("focus");
    },
    onBlur() {
      this.focused = false;
      this.$emit("blur");
    },
  },
};
</script>

<style src="./input.scss" lang="scss" scoped></style>
