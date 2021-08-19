<template>
  <oxd-text tag="h5">Check Github Username</oxd-text>

  <oxd-divider />

  <oxd-form @submit="onSubmit" @submitInvalid="onInvalid">
    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field
          label="Github Username"
          v-model="name"
          :rules="rules.name"
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

  <p>Form is {{ isValid }}</p>
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
import debounce from '@orangehrm/oxd/utils/debounce';

const checkGithub = function(value) {
  return new Promise(resolve => {
    if (value.trim()) {
      fetch(`https://api.github.com/search/users?q=${value}`)
        .then(response => response.json())
        .then(json => {
          const {total_count} = json;
          return total_count === 0
            ? resolve(true)
            : resolve('Existing Github User');
        });
    } else {
      resolve(true);
    }
  });
};

export default {
  name: 'ValidatableFrom',

  data() {
    return {
      isValid: 'valid',
      name: '',
      rules: {
        name: [
          v => (!!v && v.trim() !== '') || 'Required',
          v => (v && v.length <= 50) || 'Should be less than 50 characters',
          checkGithub,
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
    onSubmit() {
      console.log('form submit');
    },
    onInvalid() {
      console.log('form invalid');
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
