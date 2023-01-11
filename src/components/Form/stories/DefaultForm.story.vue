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
    <oxd-form-row>
      <oxd-input-group label="Label">
        <oxd-input value="Initial Value" />
      </oxd-input-group>
      <oxd-input-group label="Label">
        <oxd-input value="Initial Value" />
      </oxd-input-group>
    </oxd-form-row>

    <oxd-form-row>
      <oxd-input-group label="Input Label">
        <oxd-input value="Initial Value" />
      </oxd-input-group>
    </oxd-form-row>
  </oxd-form>
</template>

<script>
import Form from '@/components/Form/Form.vue';
import FormRow from '@/components/Form/FormRow.vue';
import InputGroup from '@/components/InputField/InputGroup.vue';
import Input from '@/components/Input/Input.vue';

export default {
  name: 'DefaultForm',
  components: {
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-input-group': InputGroup,
    'oxd-input': Input,
  },
};
</script>
