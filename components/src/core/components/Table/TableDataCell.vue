<template>
  <td>
    <slot></slot>
  </td>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-td',
});
</script>
