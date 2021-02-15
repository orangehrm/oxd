<template>
  <oxd-text tag="h5">Add Job Title</oxd-text>

  <oxd-divider />

  <oxd-form>
    <oxd-form-row>
      <oxd-form-group class="orangehrm-bottom-space" label="Job Title">
        <oxd-input v-model="jobTitle.title" />
      </oxd-form-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-form-group class="orangehrm-bottom-space" label="Job Description">
        <oxd-textarea
          v-model="jobTitle.description"
          placeholder="Type description here"
        />
      </oxd-form-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-form-group class="orangehrm-bottom-space" label="Job Specification">
        <oxd-file-input v-model="jobTitle.specification" />
      </oxd-form-group>
    </oxd-form-row>
  </oxd-form>

  <oxd-form-row>
    <oxd-form-group class="orangehrm-bottom-space" label="Note">
      <oxd-textarea v-model="jobTitle.note" placeholder="Add note" />
    </oxd-form-group>
  </oxd-form-row>

  <oxd-divider />

  <oxd-form-actions>
    <oxd-button type="ghost" label="Cancel" />
    <oxd-button
      class="orangehrm-left-space"
      type="secondary"
      label="Add"
      @click="onSave"
    />
  </oxd-form-actions>
</template>

<script>
import Form from '@orangehrm/oxd/core/components/Form/Form';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import FormGroup from '@orangehrm/oxd/core/components/Form/FormGroup';
import FormActions from '@orangehrm/oxd/core/components/Form/FormActions';
import Input from '@orangehrm/oxd/core/components/Input/Input';
import FileInput from '@orangehrm/oxd/core/components/Input/FileInput';
import Textarea from '@orangehrm/oxd/core/components/Textarea/Textarea';
import Label from '@orangehrm/oxd/core/components/Label/Label';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider';
import Button from '@orangehrm/oxd/core/components/Button/Button';
import Text from '@orangehrm/oxd/core/components/Text/Text';

const initialJobTitle = {
  title: '',
  description: '',
  specification: null,
  note: '',
};

export default {
  name: 'DefaultForm',

  data() {
    return {
      jobTitle: {...initialJobTitle},
    };
  },

  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-form-group': FormGroup,
    'oxd-form-actions': FormActions,
    'oxd-input': Input,
    'oxd-file-input': FileInput,
    'oxd-textarea': Textarea,
    'oxd-label': Label,
    'oxd-divider': Divider,
    'oxd-button': Button,
    'oxd-text': Text,
  },

  methods: {
    onSave() {},
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
