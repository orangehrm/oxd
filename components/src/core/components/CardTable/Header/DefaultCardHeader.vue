<template>
  <oxd-card-thead v-if="showHeader && !tableProps.hideHeaders">
    <oxd-card-tr :clickable="false">
      <oxd-card-th
        v-if="tableProps.selectable"
        class="oxd-padding-cell oxd-table-th checkbox-cell"
        :class="tableProps.selector.class"
        :style="tableProps.selector.style"
      >
        <oxd-checkbox-input
          :checkIcon="checkIcon"
          :disabled="allSelectDisabled"
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
import {
  defineComponent,
  reactive,
  watch,
  toRefs,
  inject,
  computed,
  onBeforeUnmount,
} from 'vue';
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

    const isSelectableRow = (item: RowItem) => {
      return (
        (!Object.prototype.hasOwnProperty.call(item, 'isSelectable') ||
          item.isSelectable) &&
        (!Object.prototype.hasOwnProperty.call(item, 'isDisabled') ||
          !item.isDisabled)
      );
    };

    const getCheckIcon = (
      selectedItems: Array<number>,
      allItems: Array<RowItem>,
    ) => {
      return allItems.filter(isSelectableRow).length === selectedItems.length
        ? 'oxd-check'
        : 'dash';
    };

    const isKeyedSelection = () => tableProps.selectionMode === 'property';

    // Keys of this page's rows the user can tick; a disabled row checkbox can't be ticked.
    const pageKeys = computed(() =>
      tableProps.items
        .filter(
          (item: RowItem) => isSelectableRow(item) && !item.isSelectDisabled,
        )
        .map((item: RowItem) => item[tableProps.selectionProperty]),
    );

    // Keyed selection may hold rows from other pages, so only this page's rows count.
    const getPageSelectionState = (selectedItems: Array<number>) => {
      const selected = new Set(selectedItems);
      const selectedCount = pageKeys.value.filter(key => selected.has(key))
        .length;
      return {
        selectedAll: selectedCount > 0,
        checkIcon:
          selectedCount === pageKeys.value.length ? 'oxd-check' : 'dash',
      };
    };

    const sameKeys = (a: Array<number>, b: Array<number>) => {
      const keys = new Set(a);
      return a.length === b.length && b.every(key => keys.has(key));
    };

    const allSelectDisabled = computed(() => pageKeys.value.length === 0);

    const state: State = reactive({
      checkIcon: 'oxd-check',
      checkedItems: [...tableProps.selected],
      selectedAll:
        tableProps.selected.length > 0 &&
        tableProps.selected.length === tableProps.items.length,
    });

    if (isKeyedSelection()) {
      Object.assign(state, getPageSelectionState(state.checkedItems));
    }

    const onRowSelected = (value: number) => {
      const itemIndex = state.checkedItems.findIndex(item => item === value);
      if (itemIndex === -1) {
        state.checkedItems.push(value);
      }
    };

    const onRowUnselected = (value: number) => {
      const itemIndex = state.checkedItems.findIndex(item => item === value);
      if (itemIndex > -1) {
        state.checkedItems.splice(itemIndex, 1);
      }
    };

    emitter.on(`${tableProps.tableId}-datatable:rowSelected`, onRowSelected);
    emitter.on(
      `${tableProps.tableId}-datatable:rowUnselected`,
      onRowUnselected,
    );

    // The header remounts on every load, so it must not leave its listeners behind.
    onBeforeUnmount(() => {
      emitter.off(`${tableProps.tableId}-datatable:rowSelected`, onRowSelected);
      emitter.off(
        `${tableProps.tableId}-datatable:rowUnselected`,
        onRowUnselected,
      );
    });

    watch(
      () => state.checkedItems,
      newVal => {
        // A keyed selection copied from the parent isn't sent back to it.
        if (!isKeyedSelection() || !sameKeys(newVal, tableProps.selected)) {
          // Keyed mode sends a copy, so the parent never holds the array this header keeps changing.
          emitter.emit(
            `${tableProps.tableId}-datatable:updateSelected`,
            isKeyedSelection() ? [...newVal] : newVal,
          );
        }
        if (isKeyedSelection()) {
          Object.assign(state, getPageSelectionState(newVal));
        } else if (tableProps.items.length > 0 && newVal.length > 0) {
          state.selectedAll = true;
          state.checkIcon = getCheckIcon(newVal, tableProps.items);
        } else {
          state.selectedAll = false;
        }
      },
      {deep: true},
    );

    // The parent can change a keyed selection too, e.g. clear it or add rows from other pages.
    watch(
      () => tableProps.selected,
      selected => {
        if (isKeyedSelection() && !sameKeys(selected, state.checkedItems)) {
          state.checkedItems = [...selected];
        }
      },
      // Deep, so in-place edits like selected.splice(0) are seen too.
      {deep: true},
    );

    // Rows can change while the header stays mounted: paging without a loader, or edits in place.
    watch(pageKeys, () => {
      if (isKeyedSelection()) {
        Object.assign(state, getPageSelectionState(state.checkedItems));
      }
    });

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
      allSelectDisabled,
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
