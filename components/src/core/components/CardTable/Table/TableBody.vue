<template>
  <div :class="classes" role="rowgroup">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-card-tbody',

  computed: {
    classes(): object {
      return {
        'oxd-table-body': true,
      };
    },
  },
});
</script>

<style src="./table-body.scss" lang="scss" scoped></style>
