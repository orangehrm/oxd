<template>
  <div class="oxd-table-header" role="rowgroup">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-card-thead',
});
</script>

<style src="./table-header.scss" lang="scss" scoped></style>
