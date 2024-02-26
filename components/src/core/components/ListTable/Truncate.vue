<template>
  <div class="oxd-table-card-cell" :tooltip="tooltipContent" flow="left">
    <oxd-skeleton v-if="loading" animate></oxd-skeleton>
    <template v-else>{{ $vt(cellContent) }}</template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import translateMixin from '../../../mixins/translate';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';

export default defineComponent({
  name: 'oxd-table-cell-truncate',

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
      type: String,
      default: () => null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isExpanded: false,
    };
  },

  computed: {
    expandable() {
      return this.header?.cellConfig?.expandable === true;
    },
    truncated() {
      const {limit = 100} = this.header?.cellConfig || {};
      return this.isExpanded === false && String(this.item).length > limit;
    },
    cellContent() {
      const {limit = 100} = this.header?.cellConfig || {};
      if (this.isExpanded || String(this.item).length <= limit)
        return this.item;
      return String(this.item).substring(0, limit) + '...';
    },
    tooltipContent() {
      if (this.truncated) return this.item;
      else return undefined;
    },
  },
});
</script>
