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
  <oxd-tab-container v-model="selector" @click-tab="onClickTab">
    <oxd-tab-panel key="login" name="Login">
      <oxd-form class="orangehrm-form">
        <oxd-text tag="h5">Login</oxd-text>
        <oxd-divider />
        <oxd-form-row>
          <oxd-input-field
            v-model="username"
            label="Username"
            placeholder="Type your username"
          />
        </oxd-form-row>
        <oxd-form-row>
          <oxd-input-field
            v-model="password"
            label="Password"
            type="password"
            placeholder="Type your password"
          />
        </oxd-form-row>

        <div class="orangehrm-form-footer">
          <oxd-button display-type="secondary" label="Login" />
          <oxd-button
            display-type="ghost"
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
            v-model="email"
            label="E-mail"
            placeholder="Type your E-mail"
          />
        </oxd-form-row>
        <oxd-form-row>
          <oxd-input-field
            v-model="username"
            label="Username"
            placeholder="Type your username"
          />
        </oxd-form-row>
        <oxd-form-row>
          <oxd-input-field
            v-model="password"
            label="Password"
            type="password"
            placeholder="Type your password"
          />
        </oxd-form-row>
        <oxd-form-row>
          <oxd-input-field
            v-model="confirm"
            label="Confirm Password"
            type="password"
            placeholder="Type your password again"
          />
        </oxd-form-row>

        <div class="orangehrm-form-footer">
          <oxd-button display-type="secondary" label="Register" />
          <oxd-button
            display-type="ghost"
            label="Login"
            @click="onClickLogin"
          />
        </div>
      </oxd-form>
    </oxd-tab-panel>
  </oxd-tab-container>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import Text from '@/components/Text/Text.vue';
import FormRow from '@/components/Form/FormRow.vue';
import Button from '@/components/Button/Button.vue';
import TabPanel from '@/components/Tab/TabPanel.vue';
import Divider from '@/components/Divider/Divider.vue';
import TabContainer from '@/components/Tab/TabContainer.vue';
import InputField from '@/components/InputField/InputField.vue';

export default {
  components: {
    'oxd-text': Text,
    'oxd-form': Form,
    'oxd-button': Button,
    'oxd-form-row': FormRow,
    'oxd-divider': Divider,
    'oxd-tab-panel': TabPanel,
    'oxd-input-field': InputField,
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
      this.selector = 'Login.vue';
    },
    onClickRegister() {
      this.selector = 'Register.vue';
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
