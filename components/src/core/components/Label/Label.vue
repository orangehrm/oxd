<template>
  <label :class="classes" :style="style">
    {{ label }}
  </label>
</template>

<script>
export default {
  name: 'oxd-label',

  props: {
    label: {
      type: String,
      required: true,
    },
    style: {
      type: Object,
    },
  },

  computed: {
    classes() {
      return {
        'oxd-label': true,
      };
    },
  },
};
</script>

<style src="./label.scss" lang="scss" scoped></style>
