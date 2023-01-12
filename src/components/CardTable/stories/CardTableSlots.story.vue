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
-->

<template>
  <div class="orangehrm-container">
    <oxd-card-table
      v-model:selected="checkedItems"
      :selector="selector"
      :headers="headers"
      :items="items"
      :selectable="true"
      :clickable="false"
      row-decorator="oxd-table-decorator-card"
      @click="onClick"
    />
  </div>
  <br />
  <div>{{ checkedItems }}</div>
</template>

<script>
import CardTable from '@/components/CardTable/CardTable.vue';

export default {
  components: {
    'oxd-card-table': CardTable,
  },
  data() {
    return {
      selector: {
        style: {flex: 1},
      },
      headers: [
        {name: 'col1', title: 'Default', style: {flex: 1}},
        {name: 'col2', slot: 'title', title: 'Title', style: {flex: 1}},
        {name: 'col3', slot: 'action', title: 'Action', style: {flex: 1}},
        {name: 'col4', slot: 'footer', title: 'Footer', style: {flex: 1}},
        {name: 'col5', slot: 'left', title: 'Left', style: {flex: 1}},
        {name: 'col6', slot: 'right', title: 'Right', style: {flex: 1}},
      ],
      items: [
        {
          col1: 'Default data content',
          col2: 'Title Content',
          col3: 'Action Content',
          col4: 'Footer Content',
          col5: 'Left Content',
          col6: 'Right Content',
        },
        {
          col1: 'Default data content',
          col2: 'Title Content',
          col3: 'Action Content',
          col4: 'Footer Content',
          col5: 'Left Content',
          col6: 'Right Content',
        },
        {
          col1: 'Default data content',
          col2: 'Title Content',
          col3: 'Action Content',
          col4: 'Footer Content',
          col5: 'Left Content',
          col6: 'Right Content',
        },
      ],
      checkedItems: [2, 0],
    };
  },

  methods: {
    onClick(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.orangehrm-container {
  background-color: #f6f5fb;
  border-radius: 1.2rem;
  padding: 0.5rem;
}
::v-deep(.card-item) {
  padding: 0.5rem 0.75rem;
  border: 1px dotted red;
}
</style>
