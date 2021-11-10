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
  <form
    class="oxd-form"
    novalidate
    @submit.prevent="onSubmit"
    @reset.prevent="onReset"
  >
    <div v-if="loading" class="oxd-form-loader">
      <oxd-loading-spinner />
    </div>
    <slot></slot>
  </form>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import useFormValidation from '../../../composables/useFormValidation';
import Spinner from '@ohrm/oxd/core/components/Loader/Spinner.vue';

export default defineComponent({
  name: 'oxd-form',

  components: {
    'oxd-loading-spinner': Spinner,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    const {validate, reset, errorbag, fieldset} = useFormValidation();

    const isProcessing = computed(() => {
      return fieldset.value.reduce((acc, field) => {
        return acc || field.processing;
      }, false);
    });

    const isFromInvalid = computed(() => {
      return errorbag.value.length > 0;
    });

    const isFormBusy = computed(() => {
      return props.loading || isProcessing.value;
    });

    const onSubmit = (e: Event) => {
      if (isFormBusy.value) return;
      setTimeout(async () => {
        await validate();
        if (!isFromInvalid.value) {
          context.emit('submitValid', e);
        } else {
          context.emit('submitInvalid', e);
        }
      }, 0);
    };

    return {
      onSubmit,
      fieldset,
      errorbag,
      isProcessing,
      isFromInvalid,
      isFormBusy,
      onReset: reset,
    };
  },
});
</script>

<style src="./form.scss" lang="scss" scoped></style>
