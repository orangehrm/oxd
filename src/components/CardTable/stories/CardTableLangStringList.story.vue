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
  <div class="orangehrm-table-header">
    <oxd-button
      display-type="secondary"
      label="Edit All"
      @click="onClickEditall"
    ></oxd-button>
  </div>
  <div class="orangehrm-container">
    <oxd-card-table
      :selector="selector"
      :headers="headers"
      :items="items"
      :selectable="false"
      :clickable="false"
      row-decorator="oxd-table-decorator-card"
    />
  </div>
  <div class="orangehrm-table-footer"></div>
</template>

<script>
import Input from '@/components/Input/Input.vue';
import Button from '@/components/Button/Button.vue';
import CardTable from '@/components/CardTable/CardTable.vue';

export default {
  components: {
    'oxd-button': Button,
    'oxd-card-table': CardTable,
  },
  data() {
    return {
      headers: [
        {name: 'sourceText', title: 'Source Text', style: {flex: '20%'}},
        {name: 'sourceNote', title: 'Source Note', style: {flex: '20%'}},
        {
          name: 'translatedText',
          title: 'Translated Text',
          style: {flex: '20%'},
          cellRenderer: this.inputRenderer,
        },
        {
          name: 'action',
          slot: 'footer',
          title: 'Actions',
          style: {flex: 1},
          cellType: 'oxd-table-cell-actions',
          cellRenderer: this.actionsRenderer,
        },
      ],
      items: [
        {
          id: 1,
          sourceText: 'Add Job Title',
          sourceNote: 'lorem ipsum isuldor',
          translatedText: 'Add Job Title',
          isEditable: false,
        },
        {
          id: 2,
          sourceText: 'Edit Job Title',
          sourceNote: '',
          translatedText: 'Edit Job Title',
          isEditable: false,
        },
        {
          id: 3,
          sourceText: 'Job Titles',
          sourceNote: '',
          translatedText: 'Job Titles',
          isEditable: false,
        },
        {
          id: 4,
          sourceText: 'Locations',
          sourceNote: 'lorem ipsum isuldor',
          translatedText: 'Locations',
          isEditable: false,
        },
        {
          id: 5,
          sourceText: 'Number of Employees',
          sourceNote: 'lorem ipsum isuldor',
          translatedText: 'Number of Employees',
          isEditable: false,
        },
        {
          id: 6,
          sourceText: 'Add Location',
          sourceNote: '',
          translatedText: 'Add Location',
          isEditable: false,
        },
      ],
    };
  },

  methods: {
    actionsRenderer(index, item, header, row) {
      const edit = {
        component: 'oxd-icon-button',
        props: {
          name: 'pencil-fill',
        },
        onClick: () => {
          this.items[index].isEditable = true;
        },
      };
      const save = {
        component: 'oxd-icon-button',
        props: {
          type: 'submit',
          name: 'check-circle-fill',
        },
      };
      const cancel = {
        component: 'oxd-icon-button',
        props: {
          name: 'x-circle-fill',
        },
        onClick: () => {
          this.items[index].isEditable = false;
        },
      };

      return {
        props: {
          header: {
            cellConfig: {
              ...(!row.isEditable && {edit}),
              ...(row.isEditable && {save, cancel}),
            },
          },
        },
      };
    },
    inputRenderer(index, data, header, row) {
      return {
        component: row.isEditable ? Input : null,
        props: {
          value: data,
          onClick: () => {
            this.items[index].isEditable = true;
          },
          onChange: ($event) => {
            this.items[index].translatedText = $event.target.value;
          },
        },
      };
    },
    onClickEditall() {
      this.items = this.items.map((item) => ({
        ...item,
        isEditable: true,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
.orangehrm-table-header {
  background-color: #fff;
  padding: 0.6rem;
  border-top-right-radius: 1.2rem;
  border-top-left-radius: 1.2rem;
}
.orangehrm-table-footer {
  background-color: #fff;
  padding: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  border-bottom-left-radius: 1.2rem;
}
.orangehrm-container {
  background-color: #e8eaef;
  border-radius: unset;
  padding: 0.5rem;
}
::v-deep(.card-footer-slot) {
  .oxd-table-cell-actions {
    justify-content: flex-end;
  }
}
</style>
