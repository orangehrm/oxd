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
  <oxd-form>
    <oxd-form-row class="orangehrm-bottom-space">
      <oxd-input-group label="Input Label" message="Validation message....">
        <oxd-input value="Initial Value" />
      </oxd-input-group>
    </oxd-form-row>

    <oxd-divider />

    <oxd-form-row class="orangehrm-bottom-space">
      <oxd-input-group label="Label">
        <template v-slot:label>
          <div>
            <b>Cu<em>stom</em></b> Label
          </div>
        </template>
        <template v-slot:default>
          <oxd-input value="Initial Value" />
        </template>
      </oxd-input-group>
    </oxd-form-row>

    <oxd-divider />

    <oxd-form-row class="orangehrm-bottom-space">
      <oxd-input-group label="Label">
        <template v-slot:default>
          <oxd-input value="Initial Value" />
        </template>
        <template v-slot:message>
          <div>Custom <b>Message</b></div>
        </template>
      </oxd-input-group>
    </oxd-form-row>

    <oxd-divider />

    <oxd-form-row class="orangehrm-bottom-space">
      <oxd-input-group
        label="Input Label"
        message="Validation message...."
        :classes="classes"
      >
        <oxd-input value="Initial Value" />
      </oxd-input-group>
    </oxd-form-row>
  </oxd-form>
</template>

<script>
import Form from '@orangehrm/oxd/core/components/Form/Form';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup';
import Input from '@orangehrm/oxd/core/components/Input/Input';
import Label from '@orangehrm/oxd/core/components/Label/Label';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider';

export default {
  name: 'DefaultForm',
  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-input-group': InputGroup,
    'oxd-input': Input,
    'oxd-label': Label,
    'oxd-divider': Divider,
  },
  computed: {
    classes() {
      return {
        label: {
          'orangehrm-custom-label': true,
        },
        message: {
          'orangehrm-custom-message': true,
        },
      };
    },
  },
};
</script>

<style lang="scss">
.orangehrm-bottom-space {
  margin-bottom: 10px;
}

.orangehrm-custom-label {
  color: brown !important;
}

.orangehrm-custom-message {
  color: red !important;
}
</style>
