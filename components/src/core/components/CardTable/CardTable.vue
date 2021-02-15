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
            {{ item[header.name] }}
          </oxd-card-td>
        </oxd-card-tr>
      </component>
    </oxd-card-tbody>
  </oxd-card-table-container>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {CardSelector, CardHeaders} from './types';
import Table from '@orangehrm/oxd/core/components/CardTable/Table.vue';
import TableHeader from '@orangehrm/oxd/core/components/CardTable/TableHeader.vue';
import TableBody from '@orangehrm/oxd/core/components/CardTable/TableBody.vue';
import TableRow from '@orangehrm/oxd/core/components/CardTable/TableRow.vue';
import TableHeaderCell from '@orangehrm/oxd/core/components/CardTable/TableHeaderCell.vue';
import TableDataCell from '@orangehrm/oxd/core/components/CardTable/TableDataCell.vue';
import DefaultDecorator from '@orangehrm/oxd/core/components/CardTable/Decorator/Default.vue';
import CardDecorator from '@orangehrm/oxd/core/components/CardTable/Decorator/Card.vue';

export default defineComponent({
  name: 'oxd-card-card-table',

  data() {
    return {
      checkedItems: this.selected as number[],
      selectedAll: (this.selected.length === this.items.length) as boolean,
    };
  },

  watch: {
    checkedItems(state) {
      this.selectedAll = state.length === this.items.length;
      this.$emit('update:selected', state);
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

  emits: ['click', 'clickCheckbox', 'update:selected', 'update:selectAll'],

  components: {
    'oxd-card-table-container': Table,
    'oxd-card-thead': TableHeader,
    'oxd-card-tbody': TableBody,
    'oxd-card-tr': TableRow,
    'oxd-card-th': TableHeaderCell,
    'oxd-card-td': TableDataCell,
    'oxd-table-decorator-default': DefaultDecorator,
    'oxd-table-decorator-card': CardDecorator,
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
        ? [...Array(this.items.length).keys()]
        : [];
      this.$emit('update:selectAll', this.selectedAll);
    },
  },
});
</script>

<style src="./card-table.scss" lang="scss" scoped></style>
