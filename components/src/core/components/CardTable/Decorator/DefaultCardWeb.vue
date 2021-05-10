<template>
  <oxd-card-tbody>
    <div :class="classes" v-for="(item, index) in tableProps.items" :key="item">
      <oxd-card-tr :clickable="tableProps.clickable">
        <oxd-card-td
          class="oxd-padding-cell"
          v-if="tableProps.selectable"
          :class="tableProps.selector.class"
          :style="tableProps.selector.style"
        >
          <oxd-table-cell-checkbox :item="item" :index="index" />
        </oxd-card-td>
        <oxd-card-cell
          class="oxd-padding-cell"
          :headers="tableProps.headers"
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
import TableDataCell from '@orangehrm/oxd/core/components/CardTable/Table/TableDataCell.vue';
import CheckboxCell from '@orangehrm/oxd/core/components/CardTable/Cell/Checkbox.vue';
import DefaultCellContainer from '@orangehrm/oxd/core/components/CardTable/Cell/DefaultCellContainer.vue';

export default defineComponent({
  name: 'oxd-table-default-card-web',

  mixins: [decoratorMixin],

  components: {
    'oxd-card-tbody': TableBody,
    'oxd-card-tr': TableRow,
    'oxd-card-td': TableDataCell,
    'oxd-card-cell': DefaultCellContainer,
    'oxd-table-cell-checkbox': CheckboxCell,
  },

  computed: {
    classes(): object {
      return {
        'oxd-table-card': true,
      };
    },
  },
});
</script>

<style src="./card.scss" lang="scss" scoped></style>
