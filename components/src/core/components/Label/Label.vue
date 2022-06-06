<template>
  <label :class="classes" :for="id" :style="style">
    {{ label }}
  </label>
  <label v-if="labelHelpText" :class="'oxd-label-help-text'">
    {{labelHelpText}}
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
    labelHelpText:{
      type: String
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
