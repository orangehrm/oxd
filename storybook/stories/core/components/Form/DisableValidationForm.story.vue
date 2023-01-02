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
  <oxd-text tag="h5">Disable validation for readonly/disabled</oxd-text>

  <oxd-divider />

  <oxd-form ref="form" @submitValid="onSubmit">
    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field label="Regular" v-model="name" :rules="rules.name" />
      </oxd-input-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field
          label="Disabled"
          v-model="name"
          :rules="rules.name"
          disabled
        />
      </oxd-input-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-group class="orangehrm-bottom-space">
        <oxd-input-field
          label="Readonly"
          v-model="name"
          :rules="rules.name"
          readonly
        />
      </oxd-input-group>
    </oxd-form-row>

    <oxd-divider />

    <oxd-form-actions>
      <oxd-button displayType="secondary" label="Save" type="submit" />
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
      rules: {
        name: [(v) => (!!v && v.trim() !== '') || 'Required'],
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
  },
};
</script>

<style lang="scss" scoped>
.orangehrm-bottom-space {
  margin-bottom: 10px;
}
</style>
