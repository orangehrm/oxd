<template>
  <div class="container">
    <oxd-table-filter filter-title="System Users">
      <template v-slot:toggleOptions>
        <oxd-icon-button name="funnel" />
        <oxd-icon-button name="pie-chart-fill" />
        <oxd-icon-button name="pencil-fill" />
      </template>
      <template v-slot:exportOptions>
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
      <oxd-form @submitValid="filterItems">
        <oxd-form-row>
          <oxd-grid :cols="4" class="orangehrm-filter-grid">
            <oxd-grid-item>
              <oxd-input-field label="Username" v-model="filters.username" />
            </oxd-grid-item>
            <oxd-grid-item>
              <oxd-input-field
                type="select"
                label="User Role"
                v-model="filters.role"
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
                type="select"
                label="Employee Name"
                v-model="filters.empName"
                :createOptions="loadEmployees"
              />
            </oxd-grid-item>
            <oxd-grid-item>
              <oxd-input-field
                type="select"
                label="Status"
                v-model="filters.status"
                :clear="false"
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
          <oxd-button displayType="secondary" label="Search" type="submit" />
          <oxd-button
            class="orangehrm-left-space"
            displayType="ghost"
            label="Reset"
          />
        </oxd-form-actions>
      </oxd-form>
    </oxd-table-filter>
    <div class="orangehrm-table-container">
      <oxd-card-table
        :headers="headers"
        :items="items"
        :selectable="true"
        v-model:selected="checkedItems"
        rowDecorator="oxd-table-decorator-card"
      />
    </div>
  </div>
</template>

<script>
import TableFilter from '@orangehrm/oxd/core/components/TableFilter/TableFilter';
import Grid from '@orangehrm/oxd/core/components/Grid/Grid';
import GridItem from '@orangehrm/oxd/core/components/Grid/GridItem';
import Form from '@orangehrm/oxd/core/components/Form/Form';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import FormActions from '@orangehrm/oxd/core/components/Form/FormActions';
import InputField from '@orangehrm/oxd/core/components/InputField/InputField';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon';
import Button from '@orangehrm/oxd/core/components/Button/Button';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider';
import CardTable from '@orangehrm/oxd/core/components/CardTable/CardTable';

export default {
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

  components: {
    'oxd-table-filter': TableFilter,
    'oxd-grid': Grid,
    'oxd-grid-item': GridItem,
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-form-actions': FormActions,
    'oxd-input-group': InputGroup,
    'oxd-input-field': InputField,
    'oxd-button': Button,
    'oxd-icon-button': IconButton,
    'oxd-divider': Divider,
    'oxd-card-table': CardTable,
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
    onBtnClick(e) {},
  },
};
</script>

<style scoped>
.container {
  background-color: #f6f5fb;
  padding: 1rem;
}
.orangehrm-filter-grid {
  width: 100%;
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
