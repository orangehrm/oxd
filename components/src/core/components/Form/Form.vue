<template>
  <form class="oxd-form" novalidate @submit.prevent="onSubmit">
    <div v-if="loading" class="oxd-form-loader">
      <oxd-loading-spinner />
    </div>
    <slot></slot>
  </form>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import useFormValidation from '../../../composables/useFormValidation';
import Spinner from '@orangehrm/oxd/core/components/Loader/Spinner.vue';

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
    const {validate, errorbag, fieldset} = useFormValidation();

    const isProcessing = computed(() => {
      return fieldset.value.reduce((acc, field) => {
        return acc && field.processing.value;
      }, true);
    });

    const isFromInvalid = computed(() => {
      return errorbag.value.length > 0;
    });

    const isFormBusy = computed(() => {
      return props.loading && isProcessing;
    });

    const onSubmit = async (e: Event) => {
      if (!isFormBusy) {
        await validate();
        if (!isFromInvalid) {
          context.emit('submitValid', e);
        } else {
          context.emit('submitInvalid', e);
        }
      }
    };

    return {
      onSubmit,
      fieldset,
      errorbag,
      isProcessing,
      isFromInvalid,
      isFormBusy,
    };
  },
});
</script>

<style src="./form.scss" lang="scss" scoped></style>
