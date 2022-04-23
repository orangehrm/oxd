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
import ProfilePicCell from './ProfilePicture.vue';
import LinkCell from './Link.vue';
import LinkWithPillCell from './LinkWithPill.vue';
import DateCell from './Date.vue';
import {CardHeaders} from '../types';
import {RowItem} from './../Cell/types';

export default defineComponent({
  name: 'oxd-table-cell-container',

  components: {
    'oxd-table-cell-default': DefaultCell,
    'oxd-table-cell-actions': ActionsCell,
    'oxd-table-cell-checkbox': CheckboxCell,
    'oxd-table-cell-profile-pic': ProfilePicCell,
    'oxd-table-cell-link': LinkCell,
    'oxd-table-cell-date': DateCell,
    'oxd-table-cell-link-with-pill': LinkWithPillCell,
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
        cellDirectives,
        cellRenderResponse = null;

      const cellData = this.items[header.name];

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

      const cellProps = mergeProps(
        {
          key: cellData,
          item: cellData,
          header: header,
          rowItem: rowData,
        },
        header.cellProps ?? {},
        cellRenderResponse?.props ?? {},
      );

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
