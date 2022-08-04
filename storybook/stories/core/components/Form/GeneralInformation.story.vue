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
import Form from '@orangehrm/oxd/core/components/Form/Form';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import InputField from '@orangehrm/oxd/core/components/InputField/InputField';
import Grid from '@orangehrm/oxd/core/components/Grid/Grid';
import GridItem from '@orangehrm/oxd/core/components/Grid/GridItem';

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
