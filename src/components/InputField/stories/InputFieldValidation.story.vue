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
  <oxd-form>
    <oxd-form-row>
      <oxd-input-field
        v-model="input"
        required
        label="Label"
        :rules="rules.input"
      />
      <oxd-input-field
        v-model="input"
        label="Label without validation"
        placeholder="Placeholder"
      />
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-field
        v-model="file"
        type="file"
        label="File Label"
        :rules="rules.file"
      />
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-field
        type="file"
        label="File Label with button"
        button-label="Browse"
        :rules="rules.file"
      />
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-field
        v-model="textarea"
        type="textarea"
        label="Textarea Label"
        :placeholder="placeholder"
        :rules="rules.textarea"
      />
    </oxd-form-row>
  </oxd-form>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import FormRow from '@/components/Form/FormRow.vue';
import InputField from '@/components/InputField/InputField.vue';

export default {
  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-input-field': InputField,
  },
  data() {
    return {
      input: '',
      file: null,
      textarea: '',
      rules: {
        input: [
          (v) => (!!v && v.trim() !== '') || 'Required',
          (v) => (v && v.length <= 5) || 'Should be less than 5 characters',
        ],
        file: [
          (v) =>
            v === null ||
            (v && v.size && v.size <= 1024 * 1024) ||
            'Attachment size exceeded',
        ],
        textarea: [
          (v) => {
            const complexValidation = v && v.length <= 5;
            return (
              complexValidation ||
              v === '' ||
              'Should be less than 5 characters'
            );
          },
        ],
      },
      placeholder: 'Placeholder',
    };
  },
};
</script>
