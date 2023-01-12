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
  <oxd-text tag="h5">Grouped Input Example</oxd-text>

  <oxd-divider />
  <oxd-form ref="form" @submit-valid="getFormValues">
    <oxd-form-row>
      <oxd-input-group
        label="Full Name"
        class="orangehrm-bottom-space"
        :classes="{wrapper: '--grouped-field'}"
      >
        <oxd-input-field
          v-model="firstname"
          class="orangehrm-firstname"
          placeholder="First name"
          :rules="rules.firstname"
        />
        <oxd-input-field
          v-model="middlename"
          class="orangehrm-middlename"
          placeholder="Middle name"
          :rules="rules.middlename"
        />
        <oxd-input-field
          v-model="lastname"
          class="orangehrm-lastname"
          placeholder="Last name"
          :rules="rules.lastname"
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
</template>

<script>
import Form from '@/components/Form/Form.vue';
import FormRow from '@/components/Form/FormRow.vue';
import InputGroup from '@/components/InputField/InputGroup.vue';
import FormActions from '@/components/Form/FormActions.vue';
import InputField from '@/components/InputField/InputField.vue';
import Divider from '@/components/Divider/Divider.vue';
import Button from '@/components/Button/Button.vue';
import Text from '@/components/Text/Text.vue';

export default {
  name: 'InputGroupForm',

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

  data() {
    return {
      firstname: '',
      lastname: '',
      middlename: '',
      rules: {
        firstname: [
          (v) => (!!v && v.trim() !== '') || 'Required',
          (v) => (v && v.length <= 50) || 'Should be less than 50 characters',
        ],
        middlename: [],
        lastname: [
          (v) => (!!v && v.trim() !== '') || 'Required',
          (v) => (v && v.length <= 50) || 'Should be less than 50 characters',
        ],
      },
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
@import '@/styles/index.scss';

.orangehrm-left-space {
  margin-left: 10px;
}

.orangehrm-bottom-space {
  margin-bottom: 10px;
}

@include oxd-respond-to('md') {
  ::v-deep(.--grouped-field) {
    display: flex;
  }

  ::v-deep(.orangehrm-firstname) {
    border-bottom-right-radius: unset;
    border-top-right-radius: unset;
  }

  ::v-deep(.orangehrm-lastname) {
    border-bottom-left-radius: unset;
    border-top-left-radius: unset;
  }

  ::v-deep(.orangehrm-middlename) {
    border-radius: unset;
  }
}
</style>
