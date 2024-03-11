<template>
  <div
    :class="classes"
    :tabindex="tabIndex"
    @click.stop="handleAction"
    @keydown.enter.stop="handleAction"
  >
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
      const isClickable = !this.isDisabled && !this.loading;
      return {
        'oxd-table-card-cell': true,
        '--clickable': isClickable,
        '--underline': isClickable && this.header?.cellConfig?.underline,
      };
    },
    tabIndex(): number {
      return this.isDisabled ? -1 : 0;
    },
  },

  methods: {
    handleAction(e: MouseEvent | KeyboardEvent) {
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
@import '../../../styles';

.oxd-table-card-cell {
  &.--clickable {
    outline: none;
    cursor: pointer;
    width: fit-content;
  }
  &.--underline:focus-visible {
    border-bottom: 1px solid $oxd-interface-gray-color;
  }
}
</style>
