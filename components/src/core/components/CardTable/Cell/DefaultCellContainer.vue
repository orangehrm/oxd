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
  PropType,
  mergeProps,
  withDirectives,
  defineComponent,
  resolveComponent,
} from 'vue';
import TableDataCell from '@ohrm/oxd/core/components/CardTable/Table/TableDataCell.vue';
import DefaultCell from './Default.vue';
import ActionsCell from './Actions.vue';
import CheckboxCell from './Checkbox.vue';
import {CardHeaders} from '../types';
import {RowItem} from './types';
import {DEVICE_LG, DEVICE_XL} from '../../../../composables/useResponsive';

export default defineComponent({
  name: 'OxdTableCellContainer',

  components: {
    'oxd-table-cell-default': DefaultCell,
    'oxd-table-cell-actions': ActionsCell,
    'oxd-table-cell-checkbox': CheckboxCell,
  },
  inject: ['screenState'],

  props: {
    index: {
      type: Number,
      default: 0,
    },
    headers: {
      type: Array as PropType<CardHeaders>,
      default: () => [],
    },
    items: {
      type: Object as PropType<RowItem>,
      default: () => ({}),
    },
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
      let cellType,
        cellProps,
        cellDirectives,
        cellRenderResponse = null;

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
        cellType = resolveComponent(header.cellType);
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
          TableDataCell,
          {
            key: header,
            style: header.style,
            class: this.$attrs.class,
          },
          {
            default: () => h(cellType ?? defaultCell, cellProps),
          },
        ),
        cellDirectives ?? [],
      );
    });
  },
});
</script>
