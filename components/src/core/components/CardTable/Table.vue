<template>
  <div class="oxd-table">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-card-table-container',

  computed: {
    classes(): object {
      return {
        'oxd-table': true,
      };
    },
  },
});
</script>

<style src="./table.scss" lang="scss" scoped></style>
