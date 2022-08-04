<template>
  <th>
    <slot></slot>
  </th>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-th',
});
</script>
