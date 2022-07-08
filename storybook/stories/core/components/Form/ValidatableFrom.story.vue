<template>
  <oxd-text tag="h5">Add Job Category</oxd-text>

  <oxd-divider />

  <oxd-form @submit="checkForm" @submitValid="getFormValues" ref="form">
    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field
          label="Job Category Name"
          v-model="name"
          :rules="rules.name"
        />
        <oxd-input-field
          label="Job Category Id"
          v-model="id"
          :rules="rules.id"
        />
        <oxd-input-field
          type="select"
          label="Job Role"
          v-model="role"
          :rules="rules.role"
          :options="[
            {id: 1, label: 'All'},
            {id: 2, label: 'Admin'},
            {id: 3, label: 'ESS'},
          ]"
        />
      </oxd-input-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-field
        type="checkbox"
        label="Check this"
        option-label="I agree"
        v-model="consent"
        :rules="rules.consent"
        true-value="yes"
        false-value="no"
      />
      <oxd-input-field
        type="switch"
        label="Switch this"
        option-label="Notify me"
        v-model="notify"
        :rules="rules.notify"
      />
    </oxd-form-row>

    <oxd-divider />

    <oxd-form-actions>
      <oxd-button displayType="ghost" label="Cancel" />
      <oxd-button
        class="orangehrm-left-space"
        displayType="secondary"
        label="Add"
        type="submit"
      />
    </oxd-form-actions>
  </oxd-form>

  <p>Form is {{ isValid ? 'vaild' : 'invalid' }}</p>
</template>

<script>
import Form from '@orangehrm/oxd/core/components/Form/Form';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup';
import FormActions from '@orangehrm/oxd/core/components/Form/FormActions';
import InputField from '@orangehrm/oxd/core/components/InputField/InputField';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider';
import Button from '@orangehrm/oxd/core/components/Button/Button';
import Text from '@orangehrm/oxd/core/components/Text/Text';

export default {
  name: 'ValidatableFrom',

  data() {
    return {
      name: '',
      id: '',
      role: {id: 2, label: 'Admin'},
      consent: '',
      notify: '',
      rules: {
        name: [
          (v) => (!!v && v.trim() !== '') || 'Required',
          (v) => (v && v.length <= 50) || 'Should be less than 50 characters',
        ],
        id: [
          (v) => (!!v && v.trim() !== '') || 'Required',
          (v) => (v && v.length >= 10) || 'Should more than 10 characters',
        ],
        role: [(v) => !!v || 'Required'],
        consent: [
          (v) => (v && v.length > 0) || 'Required',
          (v) => v === 'yes' || 'You should agree',
        ],
        notify: [(v) => v || 'Please turn notify on'],
      },
      isValid: true,
    };
  },

  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-input-group': InputGroup,
    'oxd-form-actions': FormActions,
    'oxd-input-field': InputField,
    'oxd-divider': Divider,
    'oxd-button': Button,
    'oxd-text': Text,
  },

  methods: {
    getFormValues() {
      console.log('form submit');
    },
    checkForm() {
      this.isValid = this.$refs.form.isValid;
    },
  },
};
</script>

<style lang="scss" scoped>
.orangehrm-left-space {
  margin-left: 10px;
}

.orangehrm-bottom-space {
  margin-bottom: 10px;
}
</style>
