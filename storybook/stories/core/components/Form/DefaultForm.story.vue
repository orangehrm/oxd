<template>
  <oxd-form>
    <oxd-form-row>
      <oxd-form-group label="Label">
        <oxd-input value="Initial Value" />
      </oxd-form-group>
      <oxd-form-group label="Label">
        <oxd-input value="Initial Value" />
      </oxd-form-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-form-group label="Input Label">
        <oxd-input value="Initial Value" />
      </oxd-form-group>
    </oxd-form-row>
  </oxd-form>
</template>

<script>
import Form from '@orangehrm/oxd/core/components/Form/Form';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import FormGroup from '@orangehrm/oxd/core/components/Form/FormGroup';
import Input from '@orangehrm/oxd/core/components/Input/Input';
import Label from '@orangehrm/oxd/core/components/Label/Label';

export default {
  name: 'DefaultForm',
  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-form-group': FormGroup,
    'oxd-input': Input,
    'oxd-label': Label,
  },
};
</script>
