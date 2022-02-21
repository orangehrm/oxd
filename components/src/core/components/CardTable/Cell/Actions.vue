<template>
  <div class="oxd-table-cell-actions">
    <component
      v-for="(action, key) in actions"
      :key="key"
      :is="getComponent(action, key)"
      class="oxd-table-cell-action-space"
      :disabled="isDisabled"
      v-bind="getProps(action, key)"
      @click="onClickAction(action, key, $event)"
      @update:modelValue="onChangeAction(action, key, $event)"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, mergeProps} from 'vue';
import {cellMixin} from './cell-mixin';
import {ActionsCellConfig, Action, RowItem} from './types';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';

export default defineComponent({
  name: 'oxd-table-cell-actions',

  mixins: [cellMixin],

  components: {
    'oxd-icon-button': IconButton,
  },

  props: {
    item: {
      type: Object,
      // not required, since actions evaluate from `this.header.cellConfig`
      required: false,
    },
  },

  computed: {
    actions(): object {
      if (this.item) {
        return this.item;
      }

      const cellConfig = this.header?.cellConfig as ActionsCellConfig<RowItem>;
      if (Object.keys(cellConfig).length > 0) {
        return cellConfig;
      }

      return {};
    },
    isDisabled(): boolean {
      const isRowDisabled =
        this.rowItem?.isDisabled === undefined
          ? false
          : Boolean(this.rowItem.isDisabled);
      const isTableDisabled =
        this.tableProps?.disabled === undefined
          ? false
          : Boolean(this.tableProps?.disabled);
      return isTableDisabled ? isTableDisabled : isRowDisabled;
    },
  },

  methods: {
    onClickAction(action: Action<RowItem>, key: string, e: Event) {
      const cellConfig = this.header?.cellConfig;
      if (typeof action.onClick === 'function') {
        action.onClick(this.rowItem, e);
      } else if (cellConfig && typeof cellConfig[key]?.onClick === 'function') {
        this.header?.cellConfig[key]?.onClick(this.rowItem, e);
      }
    },
    onChangeAction(action: Action<RowItem>, key: string, e: Event) {
      const cellConfig = this.header?.cellConfig;
      if (typeof action.onChange === 'function') {
        action.onChange(this.rowItem, e);
      } else if (cellConfig && typeof cellConfig[key]?.onChange === 'function') {
        this.header?.cellConfig[key]?.onChange(this.rowItem, e);
      }
    },
    getProps(action: Action<RowItem>, key: string) {
      const cellConfig = this.header?.cellConfig;
      return mergeProps(
        cellConfig ? cellConfig[key]?.props : {},
        action?.props ? action?.props : {},
      );
    },
    getComponent(action: Action<RowItem>, key: string) {
      let component = 'oxd-icon-button';
      const cellConfig = this.header?.cellConfig;
      if (action.component) {
        component = action.component;
      } else if (cellConfig && cellConfig[key]?.component) {
        component = cellConfig[key]?.component;
      }

      return component;
    },
  },
});
</script>

<style src="./actions.scss" lang="scss" scoped></style>
