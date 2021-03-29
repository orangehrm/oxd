<template>
  <oxd-text tag="h5">Custom Fields Form</oxd-text>

  <oxd-divider />

  <oxd-form @submit="checkForm" @submitValid="getFormValues" ref="form">
    <oxd-form-row>
      <div
        class="orangehrm-row-item"
        v-for="(customField, index) in customFields"
        :key="index"
      >
        <oxd-input-field
          :label="`Custom Field [${index + 1}]`"
          v-model="customFields[index].name"
          :rules="rules.name"
        />
        <oxd-icon-button
          @click="addField"
          name="plus"
          v-if="index == customFields.length - 1"
          style="height: 30px;margin-left: 15px;"
        />
      </div>
    </oxd-form-row>

    <oxd-divider />

    <oxd-form-actions>
      <oxd-button type="button" displayType="ghost" label="Cancel" />
      <oxd-button
        class="orangehrm-left-space"
        displayType="secondary"
        label="Save"
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
import IconButton from '@orangehrm/oxd/core/components/Button/Icon';
import Text from '@orangehrm/oxd/core/components/Text/Text';

export default {
  name: 'DynamicValidatableFrom',

  data() {
    return {
      customFields: [{name: ''}, {name: ''}],
      rules: {
        name: [
          v => (!!v && v.trim() !== '') || 'Required',
          v => (v && v.length <= 50) || 'Should be less than 50 characters',
        ],
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
    'oxd-icon-button': IconButton,
    'oxd-text': Text,
  },

  methods: {
    addField() {
      this.customFields.push({name: ''});
    },
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

.orangehrm-row-item {
  display: flex;
  flex-basis: 50%;
  align-items: center;
  .oxd-input-group {
    width: 80% !important;
  }
}
</style>
