<template>
  <oxd-text tag="h5">Cross Validations</oxd-text>

  <oxd-divider />

  <oxd-form ref="form" @submitValid="onSubmit" @submitInvalid="onInvalid">
    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field
          label="Start Date"
          type="date"
          v-model="startDate"
          :rules="rules.startDate"
        />
      </oxd-input-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field
          label="End Date"
          type="date"
          v-model="endDate"
          :rules="rules.endDate"
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

  <p>Form state {{ form && form.isProcessing ? 'busy' : 'idle' }}</p>
  <p>Form is {{ form && form.isFromInvalid ? 'invalid' : 'valid' }}</p>
  <p>Errorbag {{ form && form.errorbag }}</p>
</template>

<script>
import {ref} from 'vue';
import Form from '@orangehrm/oxd/core/components/Form/Form';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup';
import FormActions from '@orangehrm/oxd/core/components/Form/FormActions';
import InputField from '@orangehrm/oxd/core/components/InputField/InputField';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider';
import Button from '@orangehrm/oxd/core/components/Button/Button';
import Text from '@orangehrm/oxd/core/components/Text/Text';
import {
  startDateShouldBeBeforeEndDate,
  endDateShouldBeAfterStartDate,
} from '../../../../../components/src/validation/rules.ts';

export default {
  name: 'CrossValidatableFrom',

  setup() {
    const form = ref(null);

    return {
      form,
    };
  },

  data() {
    return {
      isValid: 'valid',
      startDate: null,
      endDate: null,
      rules: {
        startDate: [
          (v) => (!!v && v.trim() !== '') || 'Required',
          startDateShouldBeBeforeEndDate(() => this.endDate),
        ],
        endDate: [
          (v) => (!!v && v.trim() !== '') || 'Required',
          endDateShouldBeAfterStartDate(() => this.startDate),
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
    onSubmit(e) {
      console.log('form valid', e);
    },
    onInvalid(e) {
      console.log('form invalid', e);
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
