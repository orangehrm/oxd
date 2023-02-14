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

<script lang="ts">
import {
  h,
  mergeProps,
  withDirectives,
  defineComponent,
  resolveComponent,
} from 'vue';
import DefaultCell from './Default.vue';
import ActionsCell from './Actions.vue';
import CheckboxCell from './Checkbox.vue';
import type {RowItem, CardHeader} from '../types';
import {useInjectTableProps} from '@/composables/useCardtable';
import {DEVICE_LG, DEVICE_XL} from '@/composables/useResponsive';
import TableDataCell from '@/components/CardTable/Table/TableDataCell.vue';
import type {PropType, Component, Directive, DirectiveArguments} from 'vue';

export default defineComponent({
  name: 'OxdTableCellContainer',

  components: {
    'oxd-table-cell-default': DefaultCell,
    'oxd-table-cell-actions': ActionsCell,
    'oxd-table-cell-checkbox': CheckboxCell,
  },

  props: {
    index: {
      type: Number,
      required: false,
      default: 0,
    },
    headers: {
      type: Array as PropType<CardHeader[]>,
      required: false,
      default: () => [],
    },
    items: {
      type: Object as PropType<RowItem>,
      required: false,
      default: () => ({}),
    },
  },

  setup() {
    return {
      ...useInjectTableProps(),
    };
  },

  computed: {
    isMobile(): boolean {
      return !(
        this.screenState.screenType === DEVICE_LG ||
        this.screenState.screenType === DEVICE_XL
      );
    },
  },

  render() {
    const rowData = this.items;
    const defaultCell = resolveComponent('oxd-table-cell-default');

    return this.headers.map((header) => {
      let cellType: Component | null = null;
      let cellProps: {[x: string]: unknown} | null = null;
      let cellDirectives: Directive[] | null = null;
      let cellRenderResponse = null;

      const cellData = this.items[header.name];
      cellProps = {
        key: cellData,
        item: cellData,
        header: header,
        rowItem: rowData,
      };

      if (typeof header.cellRenderer === 'function') {
        cellRenderResponse = header.cellRenderer(
          this.index,
          cellData,
          header,
          rowData,
        );
      } else {
        if (
          this.isMobile &&
          (cellData === '' || cellData === null || cellData === undefined) &&
          header.cellType === undefined
        ) {
          return null;
        }
      }

      if (header.cellType) {
        cellType = resolveComponent(header.cellType) as Component;
      }

      if (cellRenderResponse?.component) {
        cellType = cellRenderResponse.component;
      }

      if (cellRenderResponse?.props) {
        cellProps = mergeProps(cellProps, cellRenderResponse.props);
      }

      if (cellRenderResponse?.directives) {
        cellDirectives = cellRenderResponse.directives;
      }

      return withDirectives(
        h(
          TableDataCell as Component,
          {
            key: header,
            style: header.style,
            class: this.$attrs.class,
          },
          {
            default: () => h(cellType ?? (defaultCell as Component), cellProps),
          },
        ),
        (cellDirectives as DirectiveArguments) ?? [],
      );
    });
  },
});
</script>
