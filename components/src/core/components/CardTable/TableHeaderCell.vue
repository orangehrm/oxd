<template>
  <div class="oxd-table-header-cell" role="columnheader">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-card-th',
});
</script>

<style src="./table-header-cell.scss" lang="scss" scoped></style>
