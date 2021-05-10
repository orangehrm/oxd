<template>
  <oxd-card-tbody class="oxd-card-table-body">
    <div :class="classes" v-for="item in tableProps.items" :key="item">
      <oxd-card-tr :clickable="tableProps.clickable">
        <div class="card-item card-left">
          <oxd-card-cell :headers="leftSlot" :items="item"></oxd-card-cell>
        </div>
        <div class="card-center">
          <div class="card-header-slot">
            <div class="card-item card-header-slot-content --left">
              <oxd-card-cell :headers="titleSlot" :items="item"></oxd-card-cell>
            </div>
            <div class="card-item card-header-slot-content --right">
              <oxd-card-cell
                :headers="actionSlot"
                :items="item"
              ></oxd-card-cell>
            </div>
          </div>
          <div class="card-item card-body-slot">
            <oxd-card-cell :headers="defaultSlot" :items="item"></oxd-card-cell>
          </div>
          <div class="card-item card-footer-slot">
            <oxd-card-cell :headers="footerSlot" :items="item"></oxd-card-cell>
          </div>
        </div>
        <div class="card-item card-right">
          <oxd-card-cell :headers="rightSlot" :items="item"></oxd-card-cell>
        </div>
      </oxd-card-tr>
    </div>
  </oxd-card-tbody>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {CardHeaders} from '../types';
import {decoratorMixin} from './decorator-mixin';
import TableBody from '@orangehrm/oxd/core/components/CardTable/Table/TableBody.vue';
import TableRow from '@orangehrm/oxd/core/components/CardTable/Table/TableRow.vue';
import DefaultCellContainer from '@orangehrm/oxd/core/components/CardTable/Cell/DefaultCellContainer.vue';

export default defineComponent({
  name: 'oxd-table-default-card-mobile',

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
        '--mobile': true,
      };
    },
    defaultSlot(): Array<CardHeaders> {
      return this.tableProps.headers.filter(header => {
        return header?.slot === undefined || header?.slot === 'default';
      });
    },
    titleSlot(): Array<CardHeaders> {
      return this.tableProps.headers.filter(header => {
        return header?.slot === 'title';
      });
    },
    actionSlot(): Array<CardHeaders> {
      return this.tableProps.headers.filter(header => {
        return header?.slot === 'action';
      });
    },
    footerSlot(): Array<CardHeaders> {
      return this.tableProps.headers.filter(header => {
        return header?.slot === 'footer';
      });
    },
    leftSlot(): Array<CardHeaders> {
      return this.tableProps.headers.filter(header => {
        return header?.slot === 'left';
      });
    },
    rightSlot(): Array<CardHeaders> {
      return this.tableProps.headers.filter(header => {
        return header?.slot === 'right';
      });
    },
  },
});
</script>

<style src="./card.scss" lang="scss" scoped></style>
