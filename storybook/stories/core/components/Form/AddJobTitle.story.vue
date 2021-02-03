<template>
  <oxd-text tag="h5">Add Job Title</oxd-text>
  <oxd-divider />
  <oxd-form>
    <oxd-form-row>
      <oxd-form-group label="Job Title">
        <oxd-input />
      </oxd-form-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-form-group label="Job Description">
        <oxd-textarea placeholder="Type description here" />
      </oxd-form-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-form-group label="Job Specification">
        <oxd-file-input />
      </oxd-form-group>
    </oxd-form-row>
  </oxd-form>

  <oxd-form-row>
    <oxd-form-group label="Note">
      <oxd-textarea placeholder="Add note" />
    </oxd-form-group>
  </oxd-form-row>
  <oxd-divider />
  <div>
    <oxd-button type="ghost" label="Cancel" />
    <oxd-button type="secondary" label="Add" />
  </div>
</template>

<script>
import Form from '@orangehrm/oxd/core/components/Form/Form';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import FormGroup from '@orangehrm/oxd/core/components/Form/FormGroup';
import Input from '@orangehrm/oxd/core/components/Input/Input';
import FileInput from '@orangehrm/oxd/core/components/Input/FileInput';
import Textarea from '@orangehrm/oxd/core/components/Textarea/Textarea';
import Label from '@orangehrm/oxd/core/components/Label/Label';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider';
import Button from '@orangehrm/oxd/core/components/Button/Button';
import Text from '@orangehrm/oxd/core/components/Text/Text';

export default {
  name: 'DefaultForm',
  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-form-group': FormGroup,
    'oxd-input': Input,
    'oxd-file-input': FileInput,
    'oxd-textarea': Textarea,
    'oxd-label': Label,
    'oxd-divider': Divider,
    'oxd-button': Button,
    'oxd-text': Text,
  },
};
</script>
