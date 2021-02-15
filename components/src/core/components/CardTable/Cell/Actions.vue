<template>
  <div class="oxd-table-cell-actions">
    <component
      v-for="(action, key) in actions"
      :key="key"
      :is="getComponent(action, key)"
      v-bind="getProps(action, key)"
      class="oxd-table-cell-action-space"
      @click="onClickAction(action, key, $event)"
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
  },

  methods: {
    onClickAction(action: Action<RowItem>, key: string, e: Event) {
      if (typeof action.onClick === 'function') {
        action.onClick(this.rowItem, e);
      } else if (typeof this.header?.cellConfig[key]?.onClick === 'function') {
        this.header?.cellConfig[key]?.onClick(this.rowItem, e);
      }
    },
    getProps(action: Action<RowItem>, key: string) {
      return mergeProps(
        this.header?.cellConfig[key]?.props,
        action?.props ? action?.props : {},
      );
    },
    getComponent(action: Action<RowItem>, key: string) {
      let component = 'oxd-icon-button';
      if (action.component) {
        component = action.component;
      } else if (this.header?.cellConfig[key]?.component) {
        component = this.header?.cellConfig[key]?.component;
      }

      return component;
    },
  },
});
</script>

<style src="./actions.scss" lang="scss" scoped></style>
