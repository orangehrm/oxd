<script lang="ts">
import {
  h,
  PropType,
  mergeProps,
  withDirectives,
  defineComponent,
  resolveComponent,
} from 'vue';
import TableDataCell from '@orangehrm/oxd/core/components/CardTable/Table/TableDataCell.vue';
import DefaultCell from './Default.vue';
import ActionsCell from './Actions.vue';
import CheckboxCell from './Checkbox.vue';
import ProfilePicCell from './ProfilePicCell.vue';
import {CardHeaders} from '../types';
import {RowItem} from './../Cell/types';

export default defineComponent({
  name: 'oxd-table-cell-container',

  components: {
    'oxd-table-cell-default': DefaultCell,
    'oxd-table-cell-actions': ActionsCell,
    'oxd-table-cell-checkbox': CheckboxCell,
    'oxd-table-cell-profile-pic': ProfilePicCell,
  },

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

  render() {
    const rowData = this.items;
    const defaultCell = resolveComponent('oxd-table-cell-default');

    return this.headers.map(header => {
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
