<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-form-actions',

  computed: {
    classes() {
      return {
        'oxd-form-actions': true,
      };
    },
  },
});
</script>

<style src="./form.scss" lang="scss" scoped></style>
