<template>
  <input type="number" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-number-input',

  props: {
    length: {
      type: Number,
      default: 1,
    },
    type: {
      type: String,
    },
  },

  setup() {},
});
</script>
