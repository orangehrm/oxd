<!--
/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */
-->
-->

<template>
  <oxd-text tag="h5">Sync/Async Validations</oxd-text>

  <oxd-divider />

  <oxd-form ref="form" @submit-valid="onSubmit" @submit-invalid="onInvalid">
    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field
          v-model="name"
          label="Github Username (real async validation)"
          :rules="rules.name"
        />
      </oxd-input-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field
          v-model="email"
          label="Email (simulated slow async validation)"
          :rules="rules.email"
        />
      </oxd-input-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field
          v-model="number"
          label="Number (sync validation)"
          :rules="rules.number"
        />
      </oxd-input-group>
    </oxd-form-row>

    <oxd-divider />

    <oxd-form-actions>
      <oxd-button display-type="ghost" label="Cancel" />
      <oxd-button
        class="orangehrm-left-space"
        display-type="secondary"
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
import Form from '@/components/Form/Form.vue';
import FormRow from '@/components/Form/FormRow.vue';
import InputGroup from '@/components/InputField/InputGroup.vue';
import FormActions from '@/components/Form/FormActions.vue';
import InputField from '@/components/InputField/InputField.vue';
import Divider from '@/components/Divider/Divider.vue';
import Button from '@/components/Button/Button.vue';
import Text from '@/components/Text/Text.vue';
import promiseDebounce from '@/utils/promiseDebounce';

const checkGithub = function (value) {
  return new Promise((resolve) => {
    if (value.trim()) {
      fetch(`https://api.github.com/search/users?q=${value}`)
        .then((response) => response.json())
        .then((json) => {
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

const delayedFunc = function (value) {
  return new Promise((resolve) => {
    if (value === 'test@test.com') {
      setTimeout(() => {
        resolve(true);
      }, 5000);
    } else {
      setTimeout(() => {
        resolve('Invalid email!');
      }, 5000);
    }
  });
};

export default {
  name: 'ValidatableFrom',

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

  setup() {
    const form = ref(null);

    return {
      form,
    };
  },

  data() {
    return {
      isValid: 'valid',
      name: '',
      email: '',
      number: '',
      rules: {
        name: [
          (v) => (!!v && v.trim() !== '') || 'Required',
          (v) => (v && v.length <= 6) || 'Should be less than 6 characters',
          promiseDebounce(checkGithub, 500),
        ],
        email: [
          (v) => (!!v && v.trim() !== '') || 'Required',
          (v) => (v && v.length <= 15) || 'Should be less than 15 characters',
          promiseDebounce(delayedFunc, 500),
        ],
        number: [
          (v) => (!!v && v.trim() !== '') || 'Required',
          (v) => (v && v.length <= 10) || 'Should be less than 10 characters',
        ],
      },
    };
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
