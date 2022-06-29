<template>
  <oxd-sheet>
    <div class="orangehrm-header-container">
      <oxd-text type="card-title">Grid Demo</oxd-text>
      <div class="orangehrm-select-columns">
        <oxd-select-input
          v-model="cols"
          :options="options"
          :showEmptySelector="false"
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
        <oxd-button label="Cancel" displayType="ghost" />
        <oxd-button
          label="Save"
          type="submit"
          displayType="secondary"
          class="orangehrm-left-space"
        />
      </oxd-form-actions>
    </oxd-form>
  </oxd-sheet>
</template>

<script>
import Grid from '@orangehrm/oxd/core/components/Grid/Grid';
import Form from '@orangehrm/oxd/core/components/Form/Form';
import Text from '@orangehrm/oxd/core/components/Text/Text';
import Sheet from '@orangehrm/oxd/core/components/Sheet/Sheet';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import Button from '@orangehrm/oxd/core/components/Button/Button';
import GridItem from '@orangehrm/oxd/core/components/Grid/GridItem';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider';
import FormActions from '@orangehrm/oxd/core/components/Form/FormActions';
import InputField from '@orangehrm/oxd/core/components/InputField/InputField';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput';

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
