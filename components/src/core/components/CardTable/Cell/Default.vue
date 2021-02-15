<template>
  {{ item }}
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {cellMixin} from './cell-mixin';

export default defineComponent({
  name: 'oxd-table-cell-default',

  mixins: [cellMixin],

  props: {
    item: {
      required: true,
    },
  },
});
</script>
