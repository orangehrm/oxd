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
import Form from '@/components/Form/Form.vue';
import FormRow from '@/components/Form/FormRow.vue';
import FormActions from '@/components/Form/FormActions.vue';
import InputField from '@/components/InputField/InputField.vue';
import Divider from '@/components/Divider/Divider.vue';
import Button from '@/components/Button/Button.vue';
import Text from '@/components/Text/Text.vue';

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
