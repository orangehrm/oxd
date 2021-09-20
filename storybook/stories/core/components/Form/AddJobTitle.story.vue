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
  <oxd-text tag="h5">Add Job Title</oxd-text>

  <oxd-divider />

  <oxd-form>
    <oxd-grid :cols="2">
      <div>
        <oxd-form-row>
          <oxd-input-field label="Job Title" v-model="jobTitle.title" />
        </oxd-form-row>

        <oxd-form-row>
          <oxd-input-field
            type="textarea"
            label="Job Description"
            placeholder="Type description here"
            v-model="jobTitle.description"
          />
        </oxd-form-row>

        <oxd-form-row>
          <oxd-input-field
            type="file"
            label="Job Specification"
            buttonLabel="Browse"
            v-model="jobTitle.specification"
          />
        </oxd-form-row>

        <oxd-form-row>
          <oxd-input-field
            type="textarea"
            label="Note"
            placeholder="Add note"
            v-model="jobTitle.note"
          />
        </oxd-form-row>

        <oxd-form-row>
          <oxd-input-field
            type="checkbox"
            value="1"
            label="Check this"
            option-label="I agree"
            v-model="jobTitle.consent"
            true-value="yes"
            false-value="no"
          />
        </oxd-form-row>
      </div>
    </oxd-grid>
  </oxd-form>

  <oxd-divider />

  <oxd-form-actions>
    <oxd-button displayType="ghost" label="Cancel" />
    <oxd-button
      class="orangehrm-left-space"
      displayType="secondary"
      label="Add"
      @click="onSave"
    />
  </oxd-form-actions>
</template>

<script>
import Form from '@orangehrm/oxd/core/components/Form/Form';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup.vue';
import FormActions from '@orangehrm/oxd/core/components/Form/FormActions';
import InputField from '@orangehrm/oxd/core/components/InputField/InputField';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider';
import Button from '@orangehrm/oxd/core/components/Button/Button';
import Text from '@orangehrm/oxd/core/components/Text/Text';
import Grid from '@orangehrm/oxd/core/components/Grid/Grid';

const initialJobTitle = {
  title: '',
  description: '',
  specification: null,
  note: '',
  consent: '',
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
    'oxd-input-field': InputField,
    'oxd-form-actions': FormActions,
    'oxd-divider': Divider,
    'oxd-button': Button,
    'oxd-text': Text,
    'oxd-grid': Grid,
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
</style>
