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
  <oxd-toast-container
    v-model:toasts="toasts"
    toastClass="oxd-toast-container--toast-custom"
  />
</template>

<script>
import ToastContainer from '@/components/Toast/Container.vue';

export default {
  components: {
    'oxd-toast-container': ToastContainer,
  },
  data() {
    return {
      toasts: [
        {
          type: 'success',
          title: 'Success',
          message: 'Success message',
          show: true,
        },
        {
          type: 'warn',
          title: 'Warn',
          message: 'Success message',
          show: true,
        },
        {
          type: 'default',
          title: 'Default',
          message: 'Success message',
          show: true,
        },
        {
          type: 'error',
          title: 'Error',
          message: 'Success message',
          show: true,
        },
        {
          type: 'info',
          title: 'Info',
          message: 'Success message',
          show: true,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.oxd-toast-container--toast-custom {
  margin-bottom: 0.4rem;
  padding: 0.2rem;
  border: 0.15rem dashed;
}
</style>
