<template>
  <div v-if="show" :class="classes" aria-live="assertive" @click="onClickToast">
    <div class="oxd-toast-start">
      <slot name="icon">
        <oxd-toast-icon :type="type" />
      </slot>
      <slot>
        <div :class="contentClasses">
          <oxd-text type="toast-title" class="oxd-toast-content-text">
            {{ title }}
          </oxd-text>
          <oxd-text type="toast-message" class="oxd-toast-content-text">
            {{ message }}
          </oxd-text>
        </div>
      </slot>
    </div>
    <slot name="close">
      <oxd-toast-close-button :type="type" @click="onClickClose" />
    </slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {toastMixin} from './toast-mixin';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import ToastCloseButton from '@orangehrm/oxd/core/components/Toast/CloseButton.vue';
import ToastIcon from '@orangehrm/oxd/core/components/Toast/Icon.vue';

export default defineComponent({
  name: 'oxd-toast',

  mixins: [toastMixin],

  components: {
    'oxd-text': Text,
    'oxd-toast-close-button': ToastCloseButton,
    'oxd-toast-icon': ToastIcon,
  },

  emits: ['update:show'],

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-toast': true,
        [`oxd-toast--${this.type}`]: true,
        ['oxd-toast--persistent']: this.persistent,
      };
    },
    contentClasses(): object {
      return {
        'oxd-toast-content': true,
        [`oxd-toast-content--${this.type}`]: true,
      };
    },
  },

  methods: {
    onClickToast() {
      if (!this.persistent) {
        this.$emit('update:show', false);
      }
    },
    onClickClose(e: Event) {
      e.stopPropagation();
      this.$emit('update:show', false);
    },
  },
});
</script>

<style src="./toast.scss" lang="scss" scoped></style>
