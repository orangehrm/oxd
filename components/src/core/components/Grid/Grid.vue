<template>
  <div class="oxd-grid">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-grid',

  props: {
    rows: {
      type: Number,
    },
    cols: {
      type: Number,
    },
    gap: {
      type: Number,
    },
  },
});
</script>

<style src="./grid.scss" lang="scss" scoped></style>
