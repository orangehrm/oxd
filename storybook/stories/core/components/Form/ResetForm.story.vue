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

<template>
  <div class="orangehrm-container">
    <oxd-text tag="h5">Add Job Category</oxd-text>

    <oxd-divider />

    <oxd-form @submitValid="getFormValues" ref="form">
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

      <oxd-divider />

      <oxd-form-actions>
        <oxd-button displayType="ghost" label="Reset" type="reset" />
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
  </div>
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

export default {
  name: 'ResetForm',

  setup() {
    const form = ref(null);

    return {
      form,
    };
  },

  data() {
    return {
      name: '',
      id: '1234567890',
      role: {id: 2, label: 'Admin'},
      rules: {
        name: [
          v => (!!v && v.trim() !== '') || 'Required',
          v => (v && v.length <= 50) || 'Should be less than 50 characters',
        ],
        id: [
          v => (!!v && v.trim() !== '') || 'Required',
          v => (v && v.length >= 10) || 'Should more than 10 characters',
        ],
        role: [v => (v && v !== null) || 'Required'],
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
.orangehrm-container {
  padding: 1.5rem;
  background-color: #fff;
}

.orangehrm-left-space {
  margin-left: 10px;
}

.orangehrm-bottom-space {
  margin-bottom: 10px;
}
</style>
