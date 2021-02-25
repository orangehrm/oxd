<template>
  <oxd-toast-container
    v-model:toasts="toasts"
    toastClass="oxd-toast-container--toast-custom"
  />
</template>

<script>
import ToastContainer from '@orangehrm/oxd/core/components/Toast/Container';

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
