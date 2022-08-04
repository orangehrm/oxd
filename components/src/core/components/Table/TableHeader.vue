<template>
  <thead class="oxd-table-header">
    <slot></slot>
  </thead>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-thead',
});
</script>

<style src="./table-header.scss" lang="scss" scoped></style>
