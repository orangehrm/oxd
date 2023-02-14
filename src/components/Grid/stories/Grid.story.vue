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
  <oxd-sheet>
    <div class="orangehrm-header-container">
      <oxd-text type="card-title">Grid Demo</oxd-text>
      <div class="orangehrm-select-columns">
        <oxd-select-input
          v-model="cols"
          :options="options"
          :show-empty-selector="false"
        />
      </div>
    </div>
    <oxd-divider />
    <oxd-form>
      <oxd-grid :cols="cols.id">
        <oxd-grid-item>
          <oxd-form-row>
            <oxd-input-field label="Oraganization Name" />
          </oxd-form-row>
        </oxd-grid-item>
        <oxd-grid-item>
          <oxd-form-row>
            <oxd-input-field label="Number of Employees" />
          </oxd-form-row>
        </oxd-grid-item>
        <oxd-grid-item>
          <oxd-form-row>
            <oxd-input-field label="Registation Number" />
          </oxd-form-row>
        </oxd-grid-item>
        <oxd-grid-item>
          <oxd-form-row>
            <oxd-input-field label="Tax Id" />
          </oxd-form-row>
        </oxd-grid-item>
        <oxd-grid-item>
          <oxd-form-row>
            <oxd-input-field label="Phone" />
          </oxd-form-row>
        </oxd-grid-item>
        <oxd-grid-item>
          <oxd-form-row>
            <oxd-input-field label="Fax" />
          </oxd-form-row>
        </oxd-grid-item>
        <oxd-grid-item>
          <oxd-form-row>
            <oxd-input-field label="Email" />
          </oxd-form-row>
        </oxd-grid-item>
        <oxd-grid-item>
          <oxd-form-row>
            <oxd-input-field label="Address Street 1" />
          </oxd-form-row>
        </oxd-grid-item>
        <oxd-grid-item>
          <oxd-form-row>
            <oxd-input-field label="Address Street 2" />
          </oxd-form-row>
        </oxd-grid-item>
      </oxd-grid>

      <oxd-divider />
      <oxd-form-actions>
        <oxd-button label="Cancel" display-type="ghost" />
        <oxd-button
          label="Save"
          type="submit"
          display-type="secondary"
          class="orangehrm-left-space"
        />
      </oxd-form-actions>
    </oxd-form>
  </oxd-sheet>
</template>

<script>
import Grid from '@/components/Grid/Grid.vue';
import Form from '@/components/Form/Form.vue';
import Text from '@/components/Text/Text.vue';
import Sheet from '@/components/Sheet/Sheet.vue';
import FormRow from '@/components/Form/FormRow.vue';
import Button from '@/components/Button/Button.vue';
import GridItem from '@/components/Grid/GridItem.vue';
import Divider from '@/components/Divider/Divider.vue';
import FormActions from '@/components/Form/FormActions.vue';
import InputField from '@/components/InputField/InputField.vue';
import SelectInput from '@/components/Input/Select/SelectInput.vue';

export default {
  name: 'DefaultGrid',
  components: {
    'oxd-form': Form,
    'oxd-grid': Grid,
    'oxd-text': Text,
    'oxd-sheet': Sheet,
    'oxd-button': Button,
    'oxd-divider': Divider,
    'oxd-form-row': FormRow,
    'oxd-grid-item': GridItem,
    'oxd-input-field': InputField,
    'oxd-form-actions': FormActions,
    'oxd-select-input': SelectInput,
  },
  data() {
    return {
      cols: {
        id: 4,
        label: '4 Columns',
      },
      options: [
        {
          id: 1,
          label: '1 Column',
        },
        {
          id: 2,
          label: '2 Columns',
        },
        {
          id: 3,
          label: '3 Columns',
        },
        {
          id: 4,
          label: '4 Columns',
        },
        {
          id: 5,
          label: '5 Column',
        },
        {
          id: 6,
          label: '6 Columns',
        },
        {
          id: 7,
          label: '7 Columns',
        },
        {
          id: 8,
          label: '8 Columns',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.orangehrm-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.orangehrm-select-columns {
  width: 100%;
  max-width: 250px;
}
.orangehrm-left-space {
  margin-left: 10px;
}
</style>
