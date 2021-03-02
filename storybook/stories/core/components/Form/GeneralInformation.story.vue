<template>
  <oxd-form>
    <oxd-grid>
      <oxd-grid-item>
        <oxd-form-row>
          <oxd-form-group label="Oraganization Name">
            <oxd-input />
          </oxd-form-group>
        </oxd-form-row>
      </oxd-grid-item>
      <oxd-grid-item>
        <oxd-form-row>
          <oxd-form-group label="Number of Employees">
            <oxd-input />
          </oxd-form-group>
        </oxd-form-row>
      </oxd-grid-item>
      <oxd-grid-item>
        <oxd-form-row>
          <oxd-form-group label="Registation Number">
            <oxd-input />
          </oxd-form-group>
        </oxd-form-row>
      </oxd-grid-item>
      <oxd-grid-item>
        <oxd-form-row>
          <oxd-form-group label="Tax Id">
            <oxd-input />
          </oxd-form-group>
        </oxd-form-row>
      </oxd-grid-item>
      <oxd-grid-item>
        <oxd-form-row>
          <oxd-form-group label="Phone">
            <oxd-input />
          </oxd-form-group>
        </oxd-form-row>
      </oxd-grid-item>
      <oxd-grid-item>
        <oxd-form-row>
          <oxd-form-group label="Fax">
            <oxd-input />
          </oxd-form-group>
        </oxd-form-row>
      </oxd-grid-item>
      <oxd-grid-item>
        <oxd-form-row>
          <oxd-form-group label="Email">
            <oxd-input />
          </oxd-form-group>
        </oxd-form-row>
      </oxd-grid-item>
      <oxd-grid-item> </oxd-grid-item>
      <oxd-grid-item>
        <oxd-form-row>
          <oxd-form-group label="Address Street 1">
            <oxd-input />
          </oxd-form-group>
        </oxd-form-row>
      </oxd-grid-item>
      <oxd-grid-item> </oxd-grid-item>
      <oxd-grid-item>
        <oxd-form-row>
          <oxd-form-group label="Address Street 2">
            <oxd-input />
          </oxd-form-group>
        </oxd-form-row>
      </oxd-grid-item>
      <oxd-grid-item> </oxd-grid-item>
    </oxd-grid>
  </oxd-form>
</template>

<script>
import Form from '@orangehrm/oxd/core/components/Form/Form';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import FormGroup from '@orangehrm/oxd/core/components/Form/FormGroup';
import Input from '@orangehrm/oxd/core/components/Input/Input';
import Label from '@orangehrm/oxd/core/components/Label/Label';
import Grid from '@orangehrm/oxd/core/components/Grid/Grid';
import GridItem from '@orangehrm/oxd/core/components/Grid/GridItem';

export default {
  name: 'GeneralInformation',
  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-form-group': FormGroup,
    'oxd-input': Input,
    'oxd-label': Label,
    'oxd-grid': Grid,
    'oxd-grid-item': GridItem,
  },
};
</script>

<style lang="scss">
.cards {
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
}
.card {
  background-color: #c8c8c8;
  color: white;
  padding: 1rem;
  height: 4rem;
}

@media (min-width: 600px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
