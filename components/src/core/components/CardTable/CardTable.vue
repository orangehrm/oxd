<template>
  <oxd-card-table-container>
    <oxd-card-thead>
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
          v-for="header in headers"
          :key="header"
          :style="header.style"
          :class="header.class"
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
            v-for="header in headers"
            :key="header"
            :style="header.style"
            :class="header.class"
          >
            <component
              :is="header.cellType ? header.cellType : 'oxd-table-cell-default'"
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
import {defineComponent, PropType, computed} from 'vue';
import {CardSelector, CardHeaders} from './types';
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

export default defineComponent({
  name: 'oxd-card-card-table',

  data() {
    return {
      checkedItems: this.selected as number[],
      selectedAll: (this.selected.length > 0 &&
        this.selected.length === this.items.length) as boolean,
    };
  },

  watch: {
    checkedItems(state) {
      this.selectedAll =
        state.length === this.items.length && this.items.length !== 0;
      this.$emit('update:selected', state);
    },
    selected(state) {
      if (state !== this.checkedItems) {
        this.checkedItems = state;
      }
    },
  },

  props: {
    selector: {
      type: Object as PropType<CardSelector>,
      default() {
        return {style: undefined, class: undefined};
      },
    },
    headers: {
      type: Array as PropType<CardHeaders>,
      default() {
        return [];
      },
    },
    items: {
      type: Array,
      default() {
        return [];
      },
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
      type: Array,
      default() {
        return [];
      },
    },
    rowDecorator: {
      type: String,
      default: 'oxd-table-decorator-default',
    },
  },

  provide() {
    return {
      tableProps: computed(() => this.$props),
    };
  },

  emits: ['click', 'clickCheckbox', 'update:selected', 'update:selectAll'],

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
  },
});
</script>

<style src="./card-table.scss" lang="scss" scoped></style>
