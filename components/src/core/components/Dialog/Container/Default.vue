<template>
  <div class="oxd-dialog-container-default">
    <div class="oxd-dialog-container-default--inner">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-dialog-container-default',
});
</script>

<style src="./default.scss" lang="scss" scoped></style>
