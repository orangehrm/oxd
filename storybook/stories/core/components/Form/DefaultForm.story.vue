<template>
  <oxd-form>
    <oxd-form-row>
      <oxd-input-group label="Label">
        <oxd-input value="Initial Value" />
      </oxd-input-group>
      <oxd-input-group label="Label">
        <oxd-input value="Initial Value" />
      </oxd-input-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-group label="Input Label">
        <oxd-input value="Initial Value" />
      </oxd-input-group>
    </oxd-form-row>
  </oxd-form>
</template>

<script>
import Form from '@orangehrm/oxd/core/components/Form/Form';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup';
import Input from '@orangehrm/oxd/core/components/Input/Input';
import Label from '@orangehrm/oxd/core/components/Label/Label';

export default {
  name: 'DefaultForm',
  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-input-group': InputGroup,
    'oxd-input': Input,
    'oxd-label': Label,
  },
};
</script>
