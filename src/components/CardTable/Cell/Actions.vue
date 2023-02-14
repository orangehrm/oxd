<!--
/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */
-->

<template>
  <div class="oxd-table-cell-actions">
    <component
      :is="getComponent(action, key)"
      v-for="(action, key) in actions"
      :key="key"
      v-bind="getProps(action, key)"
      class="oxd-table-cell-action-space"
      :disabled="isDisabled"
      @click="onClickAction(action, key, $event)"
    />
  </div>
</template>

<script lang="ts">
import type {
  Action,
  RowItem,
  ActionCellEvent,
  ActionsCellConfig,
} from '../types';
import {cellMixin} from '@/mixins/tablecell';
import {defineComponent, mergeProps} from 'vue';
import Button from '@/components/Button/Button.vue';
import IconButton from '@/components/Button/Icon.vue';
import Dropdown from '@/components/CardTable/Cell/Dropdown.vue';
import {useInjectTableProps} from '@/composables/useCardtable';

export default defineComponent({
  name: 'OxdTableCellActions',

  components: {
    'oxd-button': Button,
    'oxd-icon-button': IconButton,
    'oxd-table-dropdown': Dropdown,
  },

  mixins: [cellMixin],

  props: {
    item: {
      type: null,
      // not required, since actions evaluate from `this.header.cellConfig`
      required: false,
      default: () => undefined,
    },
  },

  setup() {
    return {
      ...useInjectTableProps(),
    };
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
          : Boolean(this.tableProps.disabled);
      return isTableDisabled ? isTableDisabled : isRowDisabled;
    },
  },

  methods: {
    onClickAction(action: Action<RowItem>, key: string, e: ActionCellEvent) {
      const cellConfig = this.header?.cellConfig;
      if (typeof action.onClick === 'function') {
        action.onClick(this.rowItem, e);
      } else if (cellConfig && typeof cellConfig[key]?.onClick === 'function') {
        cellConfig[key]?.onClick?.(this.rowItem, e);
      }
    },
    getProps(action: Action<RowItem>, key: string) {
      const cellConfig = this.header?.cellConfig;
      return mergeProps(
        cellConfig ? (cellConfig[key]?.props as {[x: string]: unknown}) : {},
        action?.props ? action?.props : {},
      );
    },
    getComponent(action: Action<RowItem>, key: string) {
      let component = 'oxd-icon-button';
      const cellConfig = this.header?.cellConfig;
      if (action.component) {
        component = action.component;
      } else if (cellConfig && cellConfig[key]?.component) {
        component = cellConfig[key]?.component || component;
      }

      return component;
    },
  },
});
</script>

<style src="./actions.scss" lang="scss" scoped></style>
