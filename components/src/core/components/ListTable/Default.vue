<template>
  <div class="oxd-table-card-cell">
    {{ item }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-table-cell',

  props: {
    header: {
      type: Object,
      default: () => ({}),
    },
    rowItem: {
      type: Object,
      default: () => ({}),
    },
    item: {
      type: [Number, String, Object],
      default: () => null,
    },
  },
});
</script>
