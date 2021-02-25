<template>
  <oxd-toast-container
    v-model:toasts="toasts"
    transition="oxd-toast-bounce-in"
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
.oxd-toast-bounce-in {
  &-enter-active {
    animation: bounce-in 0.5s;
  }

  &-leave-active {
    animation: bounce-in 0.5s reverse;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
