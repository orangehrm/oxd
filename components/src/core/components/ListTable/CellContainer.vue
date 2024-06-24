<script lang="ts">
import {
  h,
  PropType,
  mergeProps,
  withDirectives,
  defineComponent,
  resolveComponent,
} from 'vue';
import DefaultCell from './Default.vue';
import ClickableCell from './ClickableCell.vue';
import LocalizedCell from './LocalizedCell.vue';
import TruncateCell from './Truncate.vue';
import {CardHeaders} from '../CardTable/types';
import {RowItem} from '../CardTable/Cell/types';
import LinkCell from '@orangehrm/oxd/core/components/CardTable/Cell/Link.vue';
import DateCell from '@orangehrm/oxd/core/components/CardTable/Cell/Date.vue';
import ActionsCell from '@orangehrm/oxd/core/components/CardTable/Cell/Actions.vue';
import CheckboxCell from '@orangehrm/oxd/core/components/CardTable/Cell/Checkbox.vue';
import ProfilePicCell from '@orangehrm/oxd/core/components/CardTable/Cell/ProfilePicture.vue';
import LinkWithPillCell from '@orangehrm/oxd/core/components/CardTable/Cell/LinkWithPill.vue';
import TableDataCell from '@orangehrm/oxd/core/components/CardTable/Table/TableDataCell.vue';

export default defineComponent({
  name: 'oxd-table-cell-container',

  components: {
    'oxd-table-cell-link': LinkCell,
    'oxd-table-cell-date': DateCell,
    'oxd-table-cell-default': DefaultCell,
    'oxd-table-cell-actions': ActionsCell,
    'oxd-table-cell-checkbox': CheckboxCell,
    'oxd-table-cell-clickable': ClickableCell,
    'oxd-table-cell-localized': LocalizedCell,
    'oxd-table-cell-truncate': TruncateCell,
    'oxd-table-cell-profile-pic': ProfilePicCell,
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
    loading: {
      type: Boolean,
      default: false,
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
          class: header.class,
          loading: this.loading && header.hideOnLoading !== true,
          style:
            header.hideOnLoading === true && this.loading
              ? {display: 'none'}
              : {},
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
