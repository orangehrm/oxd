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
  <oxd-text tag="h5">Custom Fields Form</oxd-text>

  <oxd-divider />

  <oxd-form ref="form" @submit-valid="getFormValues">
    <oxd-form-row>
      <div
        v-for="(customField, index) in customFields"
        :key="index"
        class="orangehrm-row-item"
      >
        <oxd-input-field
          v-model="customFields[index].name"
          :label="`Custom Field [${index + 1}]`"
          :rules="rules.name"
        />
        <oxd-icon-button
          v-if="index == customFields.length - 1"
          name="plus"
          style="height: 30px; margin-left: 15px"
          @click="addField"
        />
      </div>
    </oxd-form-row>

    <oxd-divider />

    <oxd-form-actions>
      <oxd-button type="button" display-type="ghost" label="Cancel" />
      <oxd-button
        class="orangehrm-left-space"
        display-type="secondary"
        label="Save"
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
import FormActions from '@/components/Form/FormActions.vue';
import InputField from '@/components/InputField/InputField.vue';
import Divider from '@/components/Divider/Divider.vue';
import Button from '@/components/Button/Button.vue';
import IconButton from '@/components/Button/Icon.vue';
import Text from '@/components/Text/Text.vue';

export default {
  name: 'DynamicValidatableFrom',

  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-form-actions': FormActions,
    'oxd-input-field': InputField,
    'oxd-divider': Divider,
    'oxd-button': Button,
    'oxd-icon-button': IconButton,
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
      customFields: [{name: ''}, {name: ''}],
      rules: {
        name: [
          (v) => (!!v && v.trim() !== '') || 'Required',
          (v) => (v && v.length <= 50) || 'Should be less than 50 characters',
        ],
      },
      isValid: true,
    };
  },

  methods: {
    addField() {
      this.customFields.push({name: ''});
    },
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

.orangehrm-row-item {
  display: flex;
  flex-basis: 50%;
  align-items: center;
  .oxd-input-group {
    width: 80% !important;
  }
}
</style>
