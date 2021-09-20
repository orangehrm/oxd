<!--
/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */
-->

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
          <oxd-card-cell
            :index="index"
            :headers="leftSlot"
            :items="item"
          ></oxd-card-cell>
        </div>
        <div class="card-center">
          <div v-if="titleSlot.length != 0" class="card-header-slot">
            <div class="card-item card-header-slot-content --left">
              <oxd-card-cell
                :index="index"
                :headers="titleSlot"
                :items="item"
              ></oxd-card-cell>
            </div>
            <div
              v-if="actionSlot.length != 0"
              class="card-item card-header-slot-content --right"
            >
              <oxd-card-cell
                :index="index"
                :headers="actionSlot"
                :items="item"
              ></oxd-card-cell>
            </div>
          </div>
          <div v-if="defaultSlot.length != 0" class="card-item card-body-slot">
            <oxd-card-cell
              :index="index"
              :headers="defaultSlot"
              :items="item"
            ></oxd-card-cell>
          </div>
          <div v-if="footerSlot.length != 0" class="card-item card-footer-slot">
            <oxd-card-cell
              :index="index"
              :headers="footerSlot"
              :items="item"
            ></oxd-card-cell>
          </div>
        </div>
        <div v-if="rightSlot.length != 0" class="card-item card-right">
          <oxd-card-cell
            :index="index"
            :headers="rightSlot"
            :items="item"
          ></oxd-card-cell>
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
import emitter from '../../../../utils/emitter';

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
