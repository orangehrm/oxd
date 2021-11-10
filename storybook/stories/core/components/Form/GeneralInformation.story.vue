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
  <oxd-form>
    <oxd-grid :cols="4">
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
      <oxd-grid-item> </oxd-grid-item>
      <oxd-grid-item>
        <oxd-form-row>
          <oxd-input-field label="Address Street 1" />
        </oxd-form-row>
      </oxd-grid-item>
      <oxd-grid-item> </oxd-grid-item>
      <oxd-grid-item>
        <oxd-form-row>
          <oxd-input-field label="Address Street 2" />
        </oxd-form-row>
      </oxd-grid-item>
      <oxd-grid-item> </oxd-grid-item>
    </oxd-grid>
  </oxd-form>
</template>

<script>
import Form from '@ohrm/oxd/core/components/Form/Form';
import FormRow from '@ohrm/oxd/core/components/Form/FormRow';
import InputField from '@ohrm/oxd/core/components/InputField/InputField';
import Grid from '@ohrm/oxd/core/components/Grid/Grid';
import GridItem from '@ohrm/oxd/core/components/Grid/GridItem';

export default {
  name: 'GeneralInformation',
  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-input-field': InputField,
    'oxd-grid': Grid,
    'oxd-grid-item': GridItem,
  },
};
</script>
