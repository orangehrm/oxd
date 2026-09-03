<template>
  <label :id="labelId" :class="classes" :for="id" :style="style">
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
    // The label's own element id, so a control that cannot be referenced by
    // `for` (a group of inputs, say) can point at it with aria-labelledby.
    labelId: {
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
