<template>
  <oxd-form>
    <oxd-form-row class="orangehrm-bottom-space">
      <oxd-form-group label="Input Label" message="Validation message....">
        <oxd-input value="Initial Value" />
      </oxd-form-group>
    </oxd-form-row>

    <oxd-divider />

    <oxd-form-row class="orangehrm-bottom-space">
      <oxd-form-group label="Label">
        <template v-slot:label>
          <div>
            <b>Cu<em>stom</em></b> Label
          </div>
        </template>
        <template v-slot:default>
          <oxd-input value="Initial Value" />
        </template>
      </oxd-form-group>
    </oxd-form-row>

    <oxd-divider />

    <oxd-form-row class="orangehrm-bottom-space">
      <oxd-form-group label="Label">
        <template v-slot:default>
          <oxd-input value="Initial Value" />
        </template>
        <template v-slot:message>
          <div>Custom <b>Message</b></div>
        </template>
      </oxd-form-group>
    </oxd-form-row>

    <oxd-divider />

    <oxd-form-row class="orangehrm-bottom-space">
      <oxd-form-group
        label="Input Label"
        message="Validation message...."
        :classes="classes"
      >
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
import Divider from '@orangehrm/oxd/core/components/Divider/Divider';

export default {
  name: 'DefaultForm',
  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-form-group': FormGroup,
    'oxd-input': Input,
    'oxd-label': Label,
    'oxd-divider': Divider,
  },
  computed: {
    classes() {
      return {
        label: {
          'orangehrm-custom-label': true,
        },
        message: {
          'orangehrm-custom-message': true,
        },
      };
    },
  },
};
</script>

<style lang="scss">
.orangehrm-bottom-space {
  margin-bottom: 10px;
}

.orangehrm-custom-label {
  color: brown !important;
}

.orangehrm-custom-message {
  color: red !important;
}
</style>
