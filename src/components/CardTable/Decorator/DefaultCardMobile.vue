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
      v-for="(item, index) in tableProps.items"
      :key="item"
      :class="classes"
      @click="onClick(item)($event)"
    >
      <oxd-card-tr :clickable="tableProps.clickable">
        <div v-if="leftSlot.length != 0" class="card-item card-left">
          <oxd-card-cell
            :items="item"
            :index="index"
            :headers="leftSlot"
          ></oxd-card-cell>
        </div>
        <div class="card-center">
          <div v-if="titleSlot.length != 0" class="card-header-slot">
            <div class="card-item card-header-slot-content --left">
              <oxd-card-cell
                :items="item"
                :index="index"
                :headers="titleSlot"
              ></oxd-card-cell>
            </div>
            <div
              v-if="actionSlot.length != 0"
              class="card-item card-header-slot-content --right"
            >
              <oxd-card-cell
                :items="item"
                :index="index"
                :headers="actionSlot"
              ></oxd-card-cell>
            </div>
          </div>
          <div v-if="defaultSlot.length != 0" class="card-item card-body-slot">
            <oxd-card-cell
              :items="item"
              :index="index"
              :headers="defaultSlot"
            ></oxd-card-cell>
          </div>
          <div v-if="footerSlot.length != 0" class="card-item card-footer-slot">
            <oxd-card-cell
              :items="item"
              :index="index"
              :headers="footerSlot"
            ></oxd-card-cell>
          </div>
        </div>
        <div v-if="rightSlot.length != 0" class="card-item card-right">
          <oxd-card-cell
            :items="item"
            :index="index"
            :headers="rightSlot"
          ></oxd-card-cell>
        </div>
      </oxd-card-tr>
    </div>
  </oxd-card-tbody>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import emitter from '@/utils/emitter';
import type {CardHeaders, CardHeader} from '../types';
import {useInjectTableProps} from '@/composables/useCardtable';
import TableRow from '@/components/CardTable/Table/TableRow.vue';
import TableBody from '@/components/CardTable/Table/TableBody.vue';
import DefaultCellContainer from '@/components/CardTable/Cell/DefaultCellContainer.vue';

export default defineComponent({
  name: 'OxdTableDefaultCardMobile',

  components: {
    'oxd-card-tr': TableRow,
    'oxd-card-tbody': TableBody,
    'oxd-card-cell': DefaultCellContainer,
  },

  setup() {
    return {
      ...useInjectTableProps(),
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-table-card': true,
        '--mobile': true,
      };
    },
    defaultSlot(): CardHeaders {
      return this.tableProps.headers.filter((header: CardHeader) => {
        return header?.slot === undefined || header?.slot === 'default';
      });
    },
    titleSlot(): CardHeaders {
      return this.tableProps.headers.filter((header: CardHeader) => {
        return header?.slot === 'title';
      });
    },
    actionSlot(): CardHeaders {
      return this.tableProps.headers.filter((header: CardHeader) => {
        return header?.slot === 'action';
      });
    },
    footerSlot(): CardHeaders {
      return this.tableProps.headers.filter((header: CardHeader) => {
        return header?.slot === 'footer';
      });
    },
    leftSlot(): CardHeaders {
      return this.tableProps.headers.filter((header: CardHeader) => {
        return header?.slot === 'left';
      });
    },
    rightSlot(): CardHeaders {
      return this.tableProps.headers.filter((header: CardHeader) => {
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
