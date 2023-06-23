<template>
  <oxd-card-thead v-if="showHeader && !tableProps.hideHeaders">
    <oxd-card-tr :clickable="false">
      <oxd-card-th
        v-if="tableProps.selectable"
        class="oxd-padding-cell oxd-table-th"
        :class="tableProps.selector.class"
        :style="tableProps.selector.style"
      >
        <oxd-checkbox-input
          :checkIcon="checkIcon"
          v-model="selectedAll"
          @change="onChangeSelectAll"
        />
      </oxd-card-th>

      <oxd-card-th
        class="oxd-padding-cell oxd-table-th"
        v-for="header in tableProps.headers"
        :key="header"
        :style="header.style"
        :class="header.class"
        :order="tableProps.order[header.sortField]"
        @order="onColumnOrderChanged($event, header)"
      >
        <oxd-icon
          v-if="header.iconName"
          :name="header.iconName"
          :style="header.iconStyle"
        />
        <span v-else-if="header.html" v-html="header.html"></span>
        <span v-else>{{ $vt(header.title) }}</span>
      </oxd-card-th>
    </oxd-card-tr>
  </oxd-card-thead>
</template>

<script lang="ts">
import {defineComponent, reactive, watch, toRefs, inject, computed} from 'vue';
import emitter from '../../../../utils/emitter';
import TableHeader from '@orangehrm/oxd/core/components/CardTable/Table/TableHeader.vue';
import TableRow from '@orangehrm/oxd/core/components/CardTable/Table/TableRow.vue';
import TableHeaderCell from '@orangehrm/oxd/core/components/CardTable/Table/TableHeaderCell.vue';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import {DEVICE_LG, DEVICE_XL} from '../../../../composables/useResponsive';
import {CardHeader, Order} from '../types';
import translateMixin from '../../../../mixins/translate';
import {RowItem} from '../Cell/types';

interface State {
  checkIcon: string;
  checkedItems: number[];
  selectedAll: boolean;
}

export default defineComponent({
  name: 'oxd-table-header-default',

  components: {
    'oxd-icon': Icon,
    'oxd-card-thead': TableHeader,
    'oxd-card-tr': TableRow,
    'oxd-card-th': TableHeaderCell,
    'oxd-checkbox-input': CheckboxInput,
  },

  mixins: [translateMixin],

  setup() {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const tableProps: any = inject('tableProps');
    const screenState: any = inject('screenState');
    /* eslint-enable @typescript-eslint/no-explicit-any */

    const getCheckIcon = (
      selectedItems: Array<number>,
      allItems: Array<RowItem>,
    ) => {
      return allItems.filter((item: RowItem) => {
        return (
          (!Object.prototype.hasOwnProperty.call(item, 'isSelectable') ||
            item.isSelectable) &&
          (!Object.prototype.hasOwnProperty.call(item, 'isDisabled') ||
            !item.isDisabled)
        );
      }).length === selectedItems.length
        ? 'oxd-check'
        : 'dash';
    };

    const state: State = reactive({
      checkIcon: 'oxd-check',
      checkedItems: [...tableProps.selected],
      selectedAll:
        tableProps.selected.length > 0 &&
        tableProps.selected.length === tableProps.items.length,
    });

    emitter.on(`${tableProps.tableId}-datatable:rowSelected`, value => {
      const itemIndex = state.checkedItems.findIndex(item => item === value);
      if (itemIndex === -1) {
        state.checkedItems.push(value);
      }
    });

    emitter.on(`${tableProps.tableId}-datatable:rowUnselected`, value => {
      const itemIndex = state.checkedItems.findIndex(item => item === value);
      if (itemIndex > -1) {
        state.checkedItems.splice(itemIndex, 1);
      }
    });

    watch(
      () => state.checkedItems,
      newVal => {
        emitter.emit(`${tableProps.tableId}-datatable:updateSelected`, newVal);
        if (tableProps.items.length > 0 && newVal.length > 0) {
          state.selectedAll = true;
          state.checkIcon = getCheckIcon(newVal, tableProps.items);
        } else {
          state.selectedAll = false;
        }
      },
      {deep: true},
    );

    const showHeader = computed(() => {
      return (
        screenState.screenType === DEVICE_LG ||
        screenState.screenType === DEVICE_XL
      );
    });

    return {
      ...toRefs(state),
      tableProps,
      screenState,
      showHeader,
    };
  },

  methods: {
    onChangeSelectAll() {
      if (this.selectedAll) {
        emitter.emit(
          `${this.tableProps.tableId}-datatable:selectAll`,
          this.tableProps.items,
        );
      } else {
        emitter.emit(`${this.tableProps.tableId}-datatable:unselectAll`, []);
      }
    },
    onColumnOrderChanged(order: Order, column: CardHeader) {
      const orderFields = {};
      for (const key in this.tableProps.order) {
        orderFields[key] = 'DEFAULT';
      }
      emitter.emit(`${this.tableProps.tableId}-datatable:updateOrder`, {
        ...orderFields,
        [column.sortField]: order,
      });
    },
  },
});
</script>

<style src="./default-header.scss" lang="scss" scoped></style>
