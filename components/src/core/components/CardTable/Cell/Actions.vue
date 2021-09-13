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
      v-for="(action, key) in actions"
      :key="key"
      :is="getComponent(action, key)"
      v-bind="getProps(action, key)"
      class="oxd-table-cell-action-space"
      :disabled="isDisabled"
      @click="onClickAction(action, key, $event)"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, mergeProps} from 'vue';
import {cellMixin} from './cell-mixin';
import {ActionsCellConfig, Action, RowItem, ActionCellEvent} from './types';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import Dropdown from '@orangehrm/oxd/core/components/CardTable/Cell/Dropdown.vue';

export default defineComponent({
  name: 'oxd-table-cell-actions',

  mixins: [cellMixin],

  components: {
    'oxd-icon-button': IconButton,
    'oxd-button': Button,
    'oxd-table-dropdown': Dropdown,
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
        this.header?.cellConfig[key]?.onClick(this.rowItem, e);
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
