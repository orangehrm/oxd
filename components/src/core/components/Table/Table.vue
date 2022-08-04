<template>
  <table class="oxd-table">
    <slot></slot>
  </table>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-table',

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
