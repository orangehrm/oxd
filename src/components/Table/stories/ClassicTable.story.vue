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
  <oxd-clasic-table
    :selector="selector"
    :headers="headers"
    :items="items"
    @click="onClick"
    selectable
    v-model:selected="checkedItems"
  />
</template>

<script>
import ClassicTable from '@/components/Table/ClassicTable.vue';

export default {
  data() {
    return {
      selector: {
        width: '3%',
      },
      headers: [
        {name: 'col1', title: 'Column 1', width: '40%'},
        {name: 'col2', title: 'Column 2', width: '50%'},
      ],
      items: [
        {col1: 'Data 1', col2: 'Data 2'},
        {col1: 'Data 2', col2: 'Data 2'},
        {
          col1: 'Data 3',
          col2: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
      checkedItems: [2, 0],
    };
  },

  components: {
    'oxd-clasic-table': ClassicTable,
  },

  methods: {
    onClick(e) {
      console.log(e);
    },
  },
};
</script>
