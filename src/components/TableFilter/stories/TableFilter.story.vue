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
  <div class="container">
    <oxd-table-filter filter-title="System Users">
      <template #toggleOptions>
        <oxd-icon-button name="funnel" />
        <oxd-icon-button name="pie-chart-fill" />
        <oxd-icon-button name="pencil-fill" />
      </template>
      <template #exportOptions>
        <oxd-button
          size="small"
          display-type="tool"
          label="PDF"
          icon-name="file-earmark-text"
        />
        <oxd-button
          size="small"
          display-type="tool"
          label="CSV"
          icon-name="file-earmark-spreadsheet"
        />
      </template>
      <oxd-form @submit-valid="filterItems">
        <oxd-form-row>
          <oxd-grid :cols="4">
            <oxd-grid-item>
              <oxd-input-field v-model="filters.username" label="Username" />
            </oxd-grid-item>
            <oxd-grid-item>
              <oxd-input-field
                v-model="filters.role"
                type="select"
                label="User Role"
                :clear="false"
                :options="[
                  {id: 1, label: 'All'},
                  {id: 2, label: 'Admin'},
                  {id: 3, label: 'ESS'},
                ]"
              />
            </oxd-grid-item>
            <oxd-grid-item>
              <oxd-input-field
                v-model="filters.empName"
                type="autocomplete"
                label="Employee Name"
                :create-options="loadEmployees"
              />
            </oxd-grid-item>
            <oxd-grid-item>
              <oxd-input-field
                v-model="filters.status"
                type="select"
                label="Status"
                :options="[
                  {id: 1, label: 'All'},
                  {id: 2, label: 'Enabled'},
                  {id: 3, label: 'Disabled'},
                ]"
              />
            </oxd-grid-item>
          </oxd-grid>
        </oxd-form-row>

        <oxd-divider />

        <oxd-form-actions>
          <oxd-button display-type="secondary" label="Search" type="submit" />
          <oxd-button
            class="orangehrm-left-space"
            display-type="ghost"
            label="Reset"
          />
        </oxd-form-actions>
      </oxd-form>
    </oxd-table-filter>
    <div class="orangehrm-table-container">
      <oxd-card-table
        v-model:selected="checkedItems"
        :headers="headers"
        :items="items"
        :selectable="true"
        row-decorator="oxd-table-decorator-card"
      />
    </div>
  </div>
</template>

<script>
import Grid from '@/components/Grid/Grid.vue';
import Form from '@/components/Form/Form.vue';
import FormRow from '@/components/Form/FormRow.vue';
import Button from '@/components/Button/Button.vue';
import IconButton from '@/components/Button/Icon.vue';
import GridItem from '@/components/Grid/GridItem.vue';
import Divider from '@/components/Divider/Divider.vue';
import FormActions from '@/components/Form/FormActions.vue';
import CardTable from '@/components/CardTable/CardTable.vue';
import InputField from '@/components/InputField/InputField.vue';
import TableFilter from '@/components/TableFilter/TableFilter.vue';

export default {
  components: {
    'oxd-grid': Grid,
    'oxd-form': Form,
    'oxd-button': Button,
    'oxd-divider': Divider,
    'oxd-form-row': FormRow,
    'oxd-grid-item': GridItem,
    'oxd-card-table': CardTable,
    'oxd-icon-button': IconButton,
    'oxd-input-field': InputField,
    'oxd-form-actions': FormActions,
    'oxd-table-filter': TableFilter,
  },
  data() {
    return {
      filters: {
        username: '',
        role: [1],
        empName: [],
        status: [2],
      },
      headers: [
        {name: 'col1', title: 'Username', style: {flex: 1}},
        {name: 'col2', title: 'User Role', style: {flex: 1}},
        {name: 'col3', title: 'Employee Name', style: {flex: 1}},
        {name: 'col4', title: 'Status', style: {flex: 1}},
      ],
      checkedItems: [],
      items: [
        {col1: 'jack', col2: 'Admin', col3: 'James Fox', col4: 'Enabled'},
        {col1: 'vader', col2: 'Admin', col3: 'Darth Vader', col4: 'Enabled'},
      ],
    };
  },

  methods: {
    filterItems() {
      console.log(this.filters);
    },
    async loadEmployees() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              label: 'James Fox',
            },
            {
              id: 2,
              label: 'Darth Vader',
            },
            {
              id: 3,
              label: 'J Jhona Jamerson Jr.',
            },
          ]);
        }, 5000);
      });
    },
    onBtnClick() {
      // do nothing
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #f6f5fb;
  padding: 1rem;
}
.orangehrm-left-space {
  margin-left: 10px;
}
.orangehrm-table-container {
  background-color: #fff;
  border-radius: 1.2rem;
  padding: 0.5rem;
  margin-top: 1rem;
}
</style>
