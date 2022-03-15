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
    const {validate, reset, errorbag, fieldset} = useFormValidation();

    const isProcessing = computed(() => {
      return fieldset.value.reduce((acc, field) => {
        return acc || field.processing.value;
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
      validate,
      isProcessing,
      isFromInvalid,
      isFormBusy,
      onReset: reset,
    };
  },
});
</script>

<style src="./form.scss" lang="scss" scoped></style>
