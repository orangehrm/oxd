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
  <oxd-text tag="h5">Add Job Category</oxd-text>

  <oxd-divider />

  <oxd-form ref="form" @submit-valid="getFormValues">
    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field
          v-model="name"
          label="Job Category Name"
          :rules="rules.name"
        />
        <oxd-input-field
          v-model="id"
          label="Job Category Id"
          :rules="rules.id"
        />
        <oxd-input-field
          v-model="role"
          type="select"
          label="Job Role"
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
        v-model="consent"
        type="checkbox"
        label="Check this"
        option-label="I agree"
        :rules="rules.consent"
        true-value="yes"
        false-value="no"
      />
      <oxd-input-field
        v-model="notify"
        type="switch"
        label="Switch this"
        option-label="Notify me"
        :rules="rules.notify"
      />
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
      name: '',
      id: '',
      role: [{id: 2, label: 'Admin'}],
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
        role: [(v) => (v && v.length > 0) || 'Required'],
        consent: [
          (v) => (v && v.length > 0) || 'Required',
          (v) => v === 'yes' || 'You should agree',
        ],
        notify: [(v) => v || 'Please turn notify on'],
      },
      isValid: true,
    };
  },

  methods: {
    getFormValues() {
      console.log('form submit');
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
