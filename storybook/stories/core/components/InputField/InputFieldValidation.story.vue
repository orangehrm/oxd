<template>
  <oxd-form>
    <oxd-form-row>
      <oxd-input-field label="Label" :rules="rules.input" v-model="input" />
      <oxd-input-field
        label="Label without validation"
        v-model="input"
        placeholder="Placeholder"
      />
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-field
        type="file"
        label="File Label"
        :rules="rules.file"
        v-model="file"
      />
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-field
        type="file"
        label="File Label with button"
        buttonLabel="Browse"
        :rules="rules.file"
      />
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-field
        type="textarea"
        label="Textarea Label"
        :placeholder="placeholder"
        :rules="rules.textarea"
        v-model="textarea"
      />
    </oxd-form-row>
  </oxd-form>
</template>

<script>
import Form from '@orangehrm/oxd/core/components/Form/Form';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import FormGroup from '@orangehrm/oxd/core/components/Form/FormGroup';
import Input from '@orangehrm/oxd/core/components/Input/Input';
import Label from '@orangehrm/oxd/core/components/Label/Label';
import InputField from '@orangehrm/oxd/core/components/InputField/InputField';

export default {
  data() {
    return {
      input: '',
      file: null,
      textarea: '',
      rules: {
        input: [
          v => (!!v && v.trim() !== '') || 'Required',
          v => (v && v.length <= 5) || 'Should be less than 5 characters',
        ],
        file: [
          v =>
            v === null ||
            (v && v.size && v.size <= 1024 * 1024) ||
            'Attachment size exceeded',
        ],
        textarea: [
          v => {
            const complexValidation = v && v.length <= 5;
            return (
              complexValidation ||
              v === '' ||
              'Should be less than 5 characters'
            );
          },
        ],
      },
      placeholder: 'Placeholder',
    };
  },

  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-form-group': FormGroup,
    'oxd-input': Input,
    'oxd-label': Label,
    'oxd-input-field': InputField,
  },
};
</script>
