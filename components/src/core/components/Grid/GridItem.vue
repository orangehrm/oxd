<template>
  <div class="oxd-grid-item">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-grid-item',
});
</script>

<style src="./griditem.scss" lang="scss" scoped></style>
