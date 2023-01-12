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
  <oxd-icon-button name="trash" with-container @click="onClick" />

  <oxd-dialog v-if="show" :style="{maxWidth: '450px'}" @update:show="onCancel">
    <div class="orangehrm-modal-header">
      <oxd-text type="card-title">Are you sure?</oxd-text>
    </div>
    <div class="orangehrm-text-center-align">
      <oxd-text type="card-body">
        The selected item will be permanently deleted. Are you sure you want to
        continue?
      </oxd-text>
    </div>
    <div class="orangehrm-modal-footer">
      <oxd-button
        label="No, Cancel"
        display-type="text"
        class="orangehrm-button-margin"
        @click="onCancel"
      />
      <oxd-button
        label="Yes, Delete"
        icon-name="trash"
        display-type="label-danger"
        class="orangehrm-button-margin"
        @click="onDelete"
      />
    </div>
  </oxd-dialog>
</template>

<script>
import Text from '@/components/Text/Text.vue';
import Button from '@/components/Button/Button.vue';
import Dialog from '@/components/Dialog/Dialog.vue';
import IconButton from '@/components/Button/Icon.vue';

export default {
  components: {
    'oxd-dialog': Dialog,
    'oxd-icon-button': IconButton,
    'oxd-text': Text,
    'oxd-button': Button,
  },

  data() {
    return {
      show: true,
    };
  },

  methods: {
    onClick() {
      this.show = true;
    },
    onCancel() {
      this.show = false;
    },
    onDelete() {
      this.show = false;
    },
  },
};
</script>

<style>
.orangehrm-modal-header {
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: center;
}
.orangehrm-modal-footer {
  margin-top: 1.2rem;
  display: flex;
  justify-content: center;
}
.orangehrm-button-margin {
  margin: 0.25rem;
}
.orangehrm-text-center-align {
  text-align: center;
}
</style>
