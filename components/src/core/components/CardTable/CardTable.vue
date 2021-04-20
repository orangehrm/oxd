<template>
  <oxd-card-table-container>
    <oxd-card-thead v-if="showHeader">
      <oxd-card-tr>
        <oxd-card-th
          v-if="selectable"
          class="oxd-padding-cell oxd-table-th"
          :class="selector.class"
          :style="selector.style"
        >
          <input
            type="checkbox"
            v-model="selectedAll"
            @change="onChangeSelectAll"
          />
        </oxd-card-th>

        <oxd-card-th
          class="oxd-padding-cell oxd-table-th"
          v-for="(header, index) in headers"
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

    <oxd-card-tbody>
      <component
        :is="rowDecorator"
        v-for="(item, index) in items"
        :key="item"
        :clickable="clickable"
        @click="onClick(item)($event)"
        :rowItem="item"
      >
        <oxd-card-tr>
          <oxd-card-td
            v-if="selectable"
            class="oxd-padding-cell"
            :class="selector.class"
            :style="selector.style"
          >
            <input
              type="checkbox"
              :value="index"
              v-model="checkedItems"
              @click="onClickCheckbox(item, $event)"
            />
          </oxd-card-td>

          <oxd-card-td
            class="oxd-padding-cell"
            v-for="(header, index) in headers"
            :key="header"
            :style="header.style"
            :class="header.class"
          >
            <component
              :is="cellType[index]"
              :item="item[header.name]"
              :rowItem="item"
              :header="header"
            />
          </oxd-card-td>
        </oxd-card-tr>
      </component>
    </oxd-card-tbody>
  </oxd-card-table-container>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  reactive,
  watch,
  toRefs,
} from 'vue';
import {CardSelector, CardHeaders, Sort, Order} from './types';
import Table from '@orangehrm/oxd/core/components/CardTable/Table.vue';
import TableHeader from '@orangehrm/oxd/core/components/CardTable/TableHeader.vue';
import TableBody from '@orangehrm/oxd/core/components/CardTable/TableBody.vue';
import TableRow from '@orangehrm/oxd/core/components/CardTable/TableRow.vue';
import TableHeaderCell from '@orangehrm/oxd/core/components/CardTable/TableHeaderCell.vue';
import TableDataCell from '@orangehrm/oxd/core/components/CardTable/TableDataCell.vue';

// Decorators
import DefaultDecorator from '@orangehrm/oxd/core/components/CardTable/Decorator/Default.vue';
import CardDecorator from '@orangehrm/oxd/core/components/CardTable/Decorator/Card.vue';

// Cells
import DefaultCell from '@orangehrm/oxd/core/components/CardTable/Cell/Default.vue';
import ActionsCell from '@orangehrm/oxd/core/components/CardTable/Cell/Actions.vue';
import CardCell from '@orangehrm/oxd/core/components/CardTable/Cell/CardCell.vue';

import {responsiveMixin} from '../../../mixins/responsive';

interface State {
  checkedItems: number[];
  selectedAll: boolean;
  sort: Sort[];
}

export default defineComponent({
  name: 'oxd-card-card-table',

  props: {
    selector: {
      type: Object as PropType<CardSelector>,
      default: () => ({}),
    },
    headers: {
      type: Array as PropType<CardHeaders>,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    rowDecorator: {
      type: String,
      default: 'oxd-table-decorator-default',
    },
    order: {
      type: Array as PropType<Order[]>,
      default: () => [],
    },
  },

  mixins: [responsiveMixin],

  setup(props, context) {
    const state: State = reactive({
      checkedItems: props.selected,
      selectedAll:
        props.selected.length > 0 &&
        props.selected.length === props.items.length,
      sort: props.headers.map((header, index) => {
        return {
          order: props.order[index],
          header: header,
          state: props.order[index] ? props.order[index].default : 'none',
        };
      }),
    });

    context.emit('update:sort', state.sort);

    watch(
      () => state.checkedItems,
      function(newVal) {
        state.selectedAll =
          newVal.length === props.items.length && props.items.length != 0;
        context.emit('update:selected', newVal);
      },
    );

    return {
      ...toRefs(state),
    };
  },

  provide() {
    return {
      tableProps: computed(() => this.$props),
      screenType: computed((): string => this.screenType),
    };
  },

  computed: {
    showHeader(): boolean {
      if (this.rowDecorator === 'oxd-table-decorator-card') {
        return this.screenType === 'lg' || this.screenType === 'xl';
      }
      return true;
    },
    cellType(): string {
      return this.headers.map(header => {
        if (header.cellType) {
          return header.cellType;
        } else if (this.rowDecorator === 'oxd-table-decorator-card') {
          return 'oxd-table-cell-card';
        } else {
          return 'oxd-table-cell-default';
        }
      });
    },
  },

  emits: [
    'click',
    'clickCheckbox',
    'update:selected',
    'update:selectAll',
    'update:sort',
  ],

  components: {
    'oxd-card-table-container': Table,
    'oxd-card-thead': TableHeader,
    'oxd-card-tbody': TableBody,
    'oxd-card-tr': TableRow,
    'oxd-card-th': TableHeaderCell,
    'oxd-card-td': TableDataCell,

    // Decorators
    'oxd-table-decorator-default': DefaultDecorator,
    'oxd-table-decorator-card': CardDecorator,

    // Cells
    'oxd-table-cell-default': DefaultCell,
    'oxd-table-cell-actions': ActionsCell,
    'oxd-table-cell-card': CardCell,
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
      this.checkedItems = this.selectedAll
        ? [...this.range(0, this.items.length - 1)]
        : [];
      this.$emit('update:selectAll', this.selectedAll);
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

<style src="./card-table.scss" lang="scss" scoped></style>
