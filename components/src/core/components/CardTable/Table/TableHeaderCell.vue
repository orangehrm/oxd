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
  <div class="oxd-table-header-cell" role="columnheader">
    <slot></slot>
    <oxd-card-th-sort
      v-if="order !== undefined"
      :order="order"
      @order="onOrder"
    ></oxd-card-th-sort>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Order} from '../types';
import TableHeaderSortDropdown from './TableHeaderSortDropdown.vue';

export default defineComponent({
  name: 'OxdCardTh',

  components: {
    'oxd-card-th-sort': TableHeaderSortDropdown,
  },

  props: {
    order: {
      type: String,
      required: false,
      default: null,
    },
  },

  emits: ['order'],

  methods: {
    onOrder(order: Order) {
      this.$emit('order', order);
    },
  },
});
</script>

<style src="./table-header-cell.scss" lang="scss" scoped></style>
