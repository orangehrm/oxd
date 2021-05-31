<template>
  <oxd-card-tbody>
    <div
      :class="classes"
      v-for="item in items"
      :key="item"
      @click="onClick(item)($event)"
    >
      <oxd-card-tr :clickable="tableProps.clickable">
        <oxd-card-cell
          class="oxd-padding-cell"
          :headers="defaultSlot"
          :items="item"
        ></oxd-card-cell>
      </oxd-card-tr>
    </div>
  </oxd-card-tbody>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {decoratorMixin} from './decorator-mixin';
import TableBody from '@orangehrm/oxd/core/components/CardTable/Table/TableBody.vue';
import TableRow from '@orangehrm/oxd/core/components/CardTable/Table/TableRow.vue';
import DefaultCellContainer from '@orangehrm/oxd/core/components/CardTable/Cell/DefaultCellContainer.vue';
import {CardHeaders} from '../types';
import emitter from '../../../../utils/emitter';

export default defineComponent({
  name: 'oxd-table-default-card-web',

  mixins: [decoratorMixin],

  components: {
    'oxd-card-tbody': TableBody,
    'oxd-card-tr': TableRow,
    'oxd-card-cell': DefaultCellContainer,
  },

  computed: {
    classes(): object {
      return {
        'oxd-table-card': true,
      };
    },
    defaultSlot(): Array<CardHeaders> {
      if (this.tableProps.selectable) {
        return [
          {
            name: 'selector',
            cellType: 'oxd-table-cell-checkbox',
            class: this.tableProps.selector?.class,
            style: this.tableProps.selector?.style,
          },
          ...this.tableProps.headers,
        ];
      }
      return this.tableProps.headers;
    },
    items(): Array<object> {
      return this.tableProps.items.map((item, index) => {
        return this.tableProps.selectable
          ? {selector: index, ...item}
          : {...item};
      });
    },
  },

  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick(item: any) {
      return (e: Event) => {
        emitter.emit(`${this.tableProps.tableId}-datatable:clickRow`, {
          item,
          native: e,
        });
      };
    },
  },
});
</script>

<style src="./card.scss" lang="scss" scoped></style>
