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

  <oxd-form ref="form" @submitValid="onSubmit" @submitInvalid="onInvalid">
    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field
          label="Github Username (real async validation)"
          v-model="name"
          :rules="rules.name"
        />
      </oxd-input-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field
          label="Email (simulated slow async validation)"
          v-model="email"
          :rules="rules.email"
        />
      </oxd-input-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field
          label="Number (sync validation)"
          v-model="number"
          :rules="rules.number"
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
import Form from '@ohrm/oxd/core/components/Form/Form';
import FormRow from '@ohrm/oxd/core/components/Form/FormRow';
import InputGroup from '@ohrm/oxd/core/components/InputField/InputGroup';
import FormActions from '@ohrm/oxd/core/components/Form/FormActions';
import InputField from '@ohrm/oxd/core/components/InputField/InputField';
import Divider from '@ohrm/oxd/core/components/Divider/Divider';
import Button from '@ohrm/oxd/core/components/Button/Button';
import Text from '@ohrm/oxd/core/components/Text/Text';
import promiseDebounce from '@ohrm/oxd/utils/promiseDebounce';

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
