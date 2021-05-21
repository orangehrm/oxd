<template>
  <oxd-text tag="h5">Grouped Input Example</oxd-text>

  <oxd-divider />
  <oxd-form @submitValid="getFormValues" ref="form">
    <oxd-form-row>
      <oxd-input-group
        label="Full Name"
        class="orangehrm-bottom-space"
        :classes="{wrapper: '--grouped-field'}"
      >
        <oxd-input-field
          class="orangehrm-firstname"
          v-model="firstname"
          placeholder="First name"
          :rules="rules.firstname"
        />
        <oxd-input-field
          class="orangehrm-middlename"
          v-model="middlename"
          placeholder="Middle name"
          :rules="rules.middlename"
        />
        <oxd-input-field
          class="orangehrm-lastname"
          v-model="lastname"
          placeholder="Last name"
          :rules="rules.lastname"
        />
      </oxd-input-group>
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
  name: 'InputGroupForm',

  data() {
    return {
      firstname: '',
      lastname: '',
      middlename: '',
      rules: {
        firstname: [
          v => (!!v && v.trim() !== '') || 'Required',
          v => (v && v.length <= 50) || 'Should be less than 50 characters',
        ],
        middlename: [],
        lastname: [
          v => (!!v && v.trim() !== '') || 'Required',
          v => (v && v.length <= 50) || 'Should be less than 50 characters',
        ],
      },
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
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../components/src/styles/index.scss';

.orangehrm-left-space {
  margin-left: 10px;
}

.orangehrm-bottom-space {
  margin-bottom: 10px;
}

@include oxd-respond-to('md') {
  ::v-deep(.--grouped-field) {
    display: flex;
  }

  ::v-deep(.orangehrm-firstname) {
    border-bottom-right-radius: unset;
    border-top-right-radius: unset;
  }

  ::v-deep(.orangehrm-lastname) {
    border-bottom-left-radius: unset;
    border-top-left-radius: unset;
  }

  ::v-deep(.orangehrm-middlename) {
    border-radius: unset;
  }
}
</style>
