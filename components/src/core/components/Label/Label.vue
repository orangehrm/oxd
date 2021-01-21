<template>
  <label :class="classes">
    {{ label }}
  </label>
</template>

<script>
export default {
  name: "oxd-label",

  props: {
    label: {
      type: String,
      required: true,
    },
  },

  computed: {
    classes() {
      return {
        "oxd-label": true,
      };
    },
  },
};
</script>

<style src="./label.scss" lang="scss" scoped></style>
