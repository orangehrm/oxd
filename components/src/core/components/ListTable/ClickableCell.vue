<template>
  <div :class="classes" @click.stop="onClick">
    <oxd-skeleton v-if="loading" animate></oxd-skeleton>
    <template v-else>{{ item }}</template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';

export default defineComponent({
  name: 'oxd-table-cell-clickable',

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

  computed: {
    isDisabled(): boolean {
      const isRowDisabled =
        this.rowItem?.isDisabled === undefined
          ? false
          : Boolean(this.rowItem.isDisabled);
      const isTableDisabled =
        this.tableProps?.disabled === undefined
          ? false
          : Boolean(this.tableProps.disabled);
      return isTableDisabled ? isTableDisabled : isRowDisabled;
    },
    classes(): object {
      return {
        'oxd-table-card-cell': true,
        '--clickable': !this.isDisabled && !this.loading,
      };
    },
  },

  methods: {
    onClick(e: MouseEvent) {
      if (this.isDisabled) return;
      const cellConfig = this.header?.cellConfig;
      if (cellConfig && typeof cellConfig?.onClick === 'function') {
        this.header.cellConfig.onClick(this.rowItem, e);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.oxd-table-card-cell {
  &.--clickable {
    cursor: pointer;
    width: fit-content;
  }
}
</style>
