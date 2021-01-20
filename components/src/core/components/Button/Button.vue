<template>
  <button type="button" :class="classes" @click="onClick" :style="style">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "oxd-button",

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "medium",
      validator: function(value) {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  computed: {
    classes() {
      return {
        "oxd-button": true,
        "oxd-button--primary": this.primary,
        "oxd-button--secondary": !this.primary,
        [`oxd-button--${this.size}`]: true,
      };
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
  },

  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles";

.oxd-button {
  font-weight: 600;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
}
.oxd-button--primary {
  color: $oxd-white-color;
  background-color: $oxd-primary-one-color;
}
.oxd-button--secondary {
  color: $oxd-white-color;
  background-color: $oxd-secondary-one-color;
}
.oxd-button--small {
  font-size: 12px;
  padding: 10px 16px;
}
.oxd-button--medium {
  font-size: 14px;
  padding: 11px 20px;
}
.oxd-button--large {
  font-size: 16px;
  padding: 12px 24px;
}
</style>
