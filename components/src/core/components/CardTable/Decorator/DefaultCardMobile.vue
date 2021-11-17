<template>
  <oxd-card-tbody class="oxd-card-table-body">
    <div
      :class="classes"
      v-for="(item, index) in tableProps.items"
      :key="item"
      @click="onClick(item)($event)"
    >
      <oxd-card-tr :clickable="tableProps.clickable">
        <div v-if="leftSlot.length != 0" class="card-item card-left">
          <component
            :is="tableProps.isDynamicCell
              ? 'oxd-dynamic-card-cell'
              : 'oxd-card-cell'
            "
            class="oxd-padding-cell"
            :headers="defaultSlot"
            :items="item"
            :index="index"
          />
        </div>
        <div class="card-center">
          <div v-if="titleSlot.length != 0" class="card-header-slot">
            <div class="card-item card-header-slot-content --left">
              <component
                :is="tableProps.isDynamicCell
                  ? 'oxd-dynamic-card-cell'
                  : 'oxd-card-cell'
                "
                class="oxd-padding-cell"
                :headers="defaultSlot"
                :items="item"
                :index="index"
              />
            </div>
            <div
              v-if="actionSlot.length != 0"
              class="card-item card-header-slot-content --right"
            >
              <component
                :is="tableProps.isDynamicCell
                  ? 'oxd-dynamic-card-cell'
                  : 'oxd-card-cell'
                "
                class="oxd-padding-cell"
                :headers="defaultSlot"
                :items="item"
                :index="index"
              />
            </div>
          </div>
          <div v-if="defaultSlot.length != 0" class="card-item card-body-slot">
            <component
              :is="tableProps.isDynamicCell
                ? 'oxd-dynamic-card-cell'
                : 'oxd-card-cell'
              "
              class="oxd-padding-cell"
              :headers="defaultSlot"
              :items="item"
              :index="index"
            />
          </div>
          <div v-if="footerSlot.length != 0" class="card-item card-footer-slot">
            <component
              :is="tableProps.isDynamicCell
                ? 'oxd-dynamic-card-cell'
                : 'oxd-card-cell'
              "
              class="oxd-padding-cell"
              :headers="defaultSlot"
              :items="item"
              :index="index"
            />
          </div>
        </div>
        <div v-if="rightSlot.length != 0" class="card-item card-right">
          <component
            :is="tableProps.isDynamicCell
              ? 'oxd-dynamic-card-cell'
              : 'oxd-card-cell'
            "
            class="oxd-padding-cell"
            :headers="defaultSlot"
            :items="item"
            :index="index"
          />
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
import DynamicCellContainer from '@orangehrm/oxd/core/components/CardTable/Cell/DynamicCellContainer.vue';
import emitter from '../../../../utils/emitter';

export default defineComponent({
  name: 'oxd-table-default-card-mobile',

  mixins: [decoratorMixin],

  components: {
    'oxd-card-tbody': TableBody,
    'oxd-card-tr': TableRow,
    'oxd-card-cell': DefaultCellContainer,
    'oxd-dynamic-card-cell': DynamicCellContainer,
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
