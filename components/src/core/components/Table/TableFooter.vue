<template>
  <tfoot class="oxd-table-footer">
    <slot></slot>
  </tfoot>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-tfoot',
});
</script>

<style src="./table-footer.scss" lang="scss" scoped></style>
