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
  <div class="orangehrm-container">
    <oxd-card-table
      v-model:selected="checkedItems"
      :headers="headers"
      :items="items"
      :selectable="selectable"
      :disabled="disabled"
      :clickable="clickable"
      :loading="loading"
      row-decorator="oxd-table-decorator-card"
      @click="onClick"
    />
  </div>
</template>

<script>
import CardTable from '@/components/CardTable/CardTable.vue';

export default {
  components: {
    'oxd-card-table': CardTable,
  },

  props: {
    selectable: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
    clickable: {
      type: Boolean,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        {name: 'col1', title: 'Column 1', style: {flex: 1}},
        {name: 'col2', title: 'Column 2', style: {flex: 1}},
        {
          name: 'col3',
          title: 'Column 3',
          style: {flex: 1},
          cellType: 'oxd-table-cell-actions',
          cellConfig: {
            edit: {
              onClick(item, e) {
                console.log(item);
                console.log(e);
              },
              props: {
                name: 'pencil-fill',
              },
            },
          },
        },
      ],
      checkedItems: [],
    };
  },

  methods: {
    onClick(e) {
      console.log(e);
    },
  },
};
</script>

<style>
.orangehrm-container {
  background-color: #f6f5fb;
  border-radius: 1.2rem;
  padding: 0.5rem;
}
</style>
