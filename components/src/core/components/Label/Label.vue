<template>
  <label :class="classes" :for="id" :style="style">
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
    id: {
      type: String,
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
