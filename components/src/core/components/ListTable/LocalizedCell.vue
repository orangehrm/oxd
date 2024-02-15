<template>
  <div class="oxd-table-card-cell">
    <oxd-skeleton v-if="loading" animate></oxd-skeleton>
    <template v-else>{{ $vt(item) }}</template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import translateMixin from '../../../mixins/translate';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';

export default defineComponent({
  name: 'oxd-table-cell-localized',

  components: {
    'oxd-skeleton': Skeleton,
  },

  mixins: [translateMixin],

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
      type: [Number, String],
      default: () => null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
