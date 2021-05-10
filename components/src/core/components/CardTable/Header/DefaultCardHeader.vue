<template>
  <oxd-card-thead v-if="showHeader">
    <oxd-card-tr>
      <oxd-card-th
        v-if="tableProps.selectable"
        class="oxd-padding-cell oxd-table-th"
        :class="tableProps.selector.class"
        :style="tableProps.selector.style"
      >
        <oxd-checkbox-input v-model="selectedAll" @change="onChangeSelectAll" />
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
import TableHeader from '@orangehrm/oxd/core/components/CardTable/Table/TableHeader.vue';
import TableBody from '@orangehrm/oxd/core/components/CardTable/Table/TableBody.vue';
import TableRow from '@orangehrm/oxd/core/components/CardTable/Table/TableRow.vue';
import TableHeaderCell from '@orangehrm/oxd/core/components/CardTable/Table/TableHeaderCell.vue';
import TableDataCell from '@orangehrm/oxd/core/components/CardTable/Table/TableDataCell.vue';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';

interface State {
  selectedAll: boolean;
  sort: Sort[];
}

export default defineComponent({
  name: 'oxd-table-header-default',

  components: {
    'oxd-card-thead': TableHeader,
    'oxd-card-tbody': TableBody,
    'oxd-card-tr': TableRow,
    'oxd-card-th': TableHeaderCell,
    'oxd-card-td': TableDataCell,
    'oxd-checkbox-input': CheckboxInput,
  },

  setup(props, context) {
    const tableProps: any = inject('tableProps');
    const screenState: any = inject('screenState');

    const state: State = reactive({
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

    context.emit('update:sort', state.sort);

    // watch(
    //   () => checkedItems,
    //   function(newVal) {
    //     state.selectedAll =
    //       newVal.length === tableProps.items.length &&
    //       tableProps.items.length != 0;
    //     context.emit('update:selected', newVal);
    //   },
    // );

    const showHeader = computed(() => {
      return screenState.screenType === 'lg' || screenState.screenType === 'xl';
    });

    return {
      ...toRefs(state),
      tableProps,
      screenState,
      showHeader,
    };
  },

  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick(item: any) {
      return (e: Event) => {
        this.$emit('click', {item, native: e});
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickCheckbox(item: any, e: Event) {
      e.stopPropagation();
      this.$emit('clickCheckbox', {item, native: e});
    },
    onChangeSelectAll() {
      const items = this.selectedAll
        ? [...this.range(0, this.tableProps.items.length - 1)]
        : [];
      this.$emit('update:selectAll', items);
    },
    range(from: number, to: number): Array<number> {
      const range = [];
      if (from > to) {
        return [];
      }
      for (let i = from; i <= to; i++) {
        range.push(i);
      }
      return range;
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
        this.$emit('update:sort', this.sort);
      }
    },
  },
});
</script>

<style src="./default-header.scss" lang="scss" scoped></style>
