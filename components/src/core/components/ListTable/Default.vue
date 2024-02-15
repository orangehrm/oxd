<template>
  <div class="oxd-table-card-cell">
    <oxd-skeleton v-if="loading" animate></oxd-skeleton>
    <template v-else>{{ item }}</template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';

export default defineComponent({
  name: 'oxd-table-cell',

  components: {
    'oxd-skeleton': Skeleton,
  },

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
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
