<template>
  <div>
    <button @click="show = !show">
      Toggle
    </button>

    <transition name="oxd-toast-fade">
      <oxd-toast v-model:show="show" title="Success" />
    </transition>
  </div>
</template>

<script>
import Toast from '@orangehrm/oxd/core/components/Toast/Toast.vue';

export default {
  components: {
    'oxd-toast': Toast,
  },
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.oxd-toast-fade {
  // https://v3.vuejs.org/guide/transitions-enterleave.html#transitioning-single-elements-components
  &-enter-active {
    transition: opacity 0.5s ease-out;
  }
  &-enter-from {
    opacity: 0;
  }

  &-leave-active {
    transition: opacity 1s cubic-bezier(1, 0.5, 0.8, 1);
  }
  &-leave-to {
    opacity: 0 !important;
  }
}
</style>
