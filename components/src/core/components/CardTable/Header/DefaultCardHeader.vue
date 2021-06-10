<template>
  <oxd-card-thead v-if="showHeader">
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
        v-for="(header, index) in tableProps.headers"
        :key="header"
        :style="header.style"
        :class="header.class"
        :sort="getSort(index)"
        @sort="onSort"
      >
        {{ header.title }}
      </oxd-card-th>
    </oxd-card-tr>
  </oxd-card-thead>
</template>

<script lang="ts">
import {defineComponent, reactive, watch, toRefs, inject, computed} from 'vue';
import {Sort} from '../types';
import emitter from '../../../../utils/emitter';
import TableHeader from '@orangehrm/oxd/core/components/CardTable/Table/TableHeader.vue';
import TableRow from '@orangehrm/oxd/core/components/CardTable/Table/TableRow.vue';
import TableHeaderCell from '@orangehrm/oxd/core/components/CardTable/Table/TableHeaderCell.vue';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';
import {DEVICE_LG, DEVICE_XL} from '../../../../composables/useResponsive';

interface State {
  checkIcon: string;
  checkedItems: number[];
  selectedAll: boolean;
  sort: Sort[];
}

export default defineComponent({
  name: 'oxd-table-header-default',

  components: {
    'oxd-card-thead': TableHeader,
    'oxd-card-tr': TableRow,
    'oxd-card-th': TableHeaderCell,
    'oxd-checkbox-input': CheckboxInput,
  },

  setup() {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const tableProps: any = inject('tableProps');
    const screenState: any = inject('screenState');
    /* eslint-enable @typescript-eslint/no-explicit-any */

    const state: State = reactive({
      checkIcon: 'check',
      checkedItems: [...tableProps.selected],
      selectedAll:
        tableProps.selected.length > 0 &&
        tableProps.selected.length === tableProps.items.length,
      sort: tableProps.headers.map((header, index) => {
        return {
          order: tableProps.order[index],
          header: header,
          state: tableProps.order[index]
            ? tableProps.order[index].default
            : 'none',
        };
      }),
    });

    emitter.emit(`${tableProps.tableId}-datatable:updateSort`, state.sort);

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
          if (newVal.length === tableProps.items.length) {
            state.checkIcon = 'check';
          } else {
            state.checkIcon = 'dash';
          }
        } else {
          state.selectedAll = false;
        }
      },
      {deep: true},
    );

    watch(
      () => tableProps.items,
      () => {
        state.selectedAll = false;
        emitter.emit(`${tableProps.tableId}-datatable:updateSelected`, []);
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
    getSort(index: number): Sort {
      return this.sort[index];
    },
    onSort(sortEvent: Sort) {
      const {order} = sortEvent;
      if (order) {
        const _sort: Sort = {...this.sort[order.id]};
        switch (_sort.state) {
          case 'asc':
            _sort.state = 'desc';
            break;
          case 'desc':
            _sort.state = '';
            break;
          case '':
            _sort.state = 'asc';
            break;
          default:
            break;
        }
        this.sort[order.id] = _sort;
        emitter.emit(
          `${this.tableProps.tableId}-datatable:updateSort`,
          this.sort,
        );
      }
    },
  },
});
</script>

<style src="./default-header.scss" lang="scss" scoped></style>
