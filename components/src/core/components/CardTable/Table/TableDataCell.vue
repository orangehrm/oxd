<template>
  <div class="oxd-table-cell" role="cell">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-card-td',
});
</script>
