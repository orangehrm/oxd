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
  <oxd-tab-container v-model="selector" @clickTab="onClickTab">
    <oxd-tab-panel key="login" name="Login">
      <oxd-form class="orangehrm-form">
        <oxd-text tag="h5">Login</oxd-text>
        <oxd-divider />
        <oxd-form-row>
          <oxd-input-field
            label="Username"
            v-model="username"
            placeholder="Type your username"
          />
        </oxd-form-row>
        <oxd-form-row>
          <oxd-input-field
            label="Password"
            type="password"
            v-model="password"
            placeholder="Type your password"
          />
        </oxd-form-row>

        <div class="orangehrm-form-footer">
          <oxd-button displayType="secondary" label="Login" />
          <oxd-button
            displayType="ghost"
            label="Register"
            @click="onClickRegister"
          />
        </div>
      </oxd-form>
    </oxd-tab-panel>
    <oxd-tab-panel key="register" name="Register">
      <oxd-form class="orangehrm-form">
        <oxd-text tag="h5">Register</oxd-text>
        <oxd-divider />
        <oxd-form-row>
          <oxd-input-field
            label="E-mail"
            v-model="email"
            placeholder="Type your E-mail"
          />
        </oxd-form-row>
        <oxd-form-row>
          <oxd-input-field
            label="Username"
            v-model="username"
            placeholder="Type your username"
          />
        </oxd-form-row>
        <oxd-form-row>
          <oxd-input-field
            label="Password"
            type="password"
            v-model="password"
            placeholder="Type your password"
          />
        </oxd-form-row>
        <oxd-form-row>
          <oxd-input-field
            label="Confirm Password"
            type="password"
            v-model="confirm"
            placeholder="Type your password again"
          />
        </oxd-form-row>

        <div class="orangehrm-form-footer">
          <oxd-button displayType="secondary" label="Register" />
          <oxd-button displayType="ghost" label="Login" @click="onClickLogin" />
        </div>
      </oxd-form>
    </oxd-tab-panel>
  </oxd-tab-container>
</template>

<script>
import Form from '@ohrm/oxd/core/components/Form/Form';
import Text from '@ohrm/oxd/core/components/Text/Text';
import FormRow from '@ohrm/oxd/core/components/Form/FormRow';
import Button from '@ohrm/oxd/core/components/Button/Button';
import TabPanel from '@ohrm/oxd/core/components/Tab/TabPanel';
import Divider from '@ohrm/oxd/core/components/Divider/Divider';
import FormActions from '@ohrm/oxd/core/components/Form/FormActions';
import TabContainer from '@ohrm/oxd/core/components/Tab/TabContainer';
import InputField from '@ohrm/oxd/core/components/InputField/InputField';

export default {
  components: {
    'oxd-text': Text,
    'oxd-form': Form,
    'oxd-button': Button,
    'oxd-form-row': FormRow,
    'oxd-divider': Divider,
    'oxd-tab-panel': TabPanel,
    'oxd-input-field': InputField,
    'oxd-form-actions': FormActions,
    'oxd-tab-container': TabContainer,
  },

  data() {
    return {
      selector: null,
      email: null,
      confirm: null,
      username: null,
      password: null,
    };
  },

  methods: {
    onClickLogin() {
      this.selector = 'Login';
    },
    onClickRegister() {
      this.selector = 'Register';
    },
    onClickTab($e) {
      $e.preventDefault();
    },
  },
};
</script>

<style scoped>
.orangehrm-form {
  width: 400px;
  margin: 0 auto;
}
.orangehrm-form-footer {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}
</style>
