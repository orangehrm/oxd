<template>
  <transition :name="computedTransition" appear>
    <oxd-overlay role="dialog" centered :show="true" @click="onClickOverlay">
      <!--
    :aria-labelledby="'dialogTitle_' + id"
    :aria-describedby="'dialogDesc_' + id"
    -->
      <component :is="dialogContainer">
        <oxd-sheet
          :class="classes"
          v-bind="$attrs"
          role="document"
          @click="onClickSheet"
        >
          <oxd-dialog-close-button
            v-if="withClose"
            class="oxd-dialog-close-button-position"
            @click="onClose"
          />
          <slot></slot>
        </oxd-sheet>
      </component>
    </oxd-overlay>
  </transition>
</template>

<script lang="ts">
import {defineComponent, onUnmounted} from 'vue';
import Overlay from '@orangehrm/oxd/core/components/Dialog/Overlay.vue';
import CloseButton from '@orangehrm/oxd/core/components/Dialog/CloseButton.vue';
import Sheet from '@orangehrm/oxd/core/components/Sheet/Sheet.vue';

// Containers
import DefaultContainer from '@orangehrm/oxd/core/components/Dialog/Container/Default.vue';

export default defineComponent({
  name: 'oxd-dialog',
  inheritAttrs: false,

  components: {
    'oxd-overlay': Overlay,
    'oxd-dialog-close-button': CloseButton,
    'oxd-sheet': Sheet,

    // Containers
    'oxd-dialog-container-default': DefaultContainer,
  },

  emits: ['update:show'],

  props: {
    shadow: {
      type: Boolean,
      default: true,
    },
    withClose: {
      type: Boolean,
      default: true,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    dialogContainer: {
      type: String,
      default: 'oxd-dialog-container-default',
    },
    withTransition: {
      type: Boolean,
      default: true,
    },
    dialogSizeClass: {
      type: String,
      default: 'modal-md',
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-dialog-sheet': true,
        'oxd-dialog-sheet--shadow': this.shadow,
        [`${this.dialogSizeClass}`]: true,
      };
    },
    computedTransition(): string {
      return this.withTransition ? 'fade' : '';
    },
  },

  methods: {
    onClose() {
      this.$emit('update:show', false);
    },
    onClickOverlay() {
      if (!this.persistent) {
        this.$emit('update:show', false);
      }
    },
    onClickSheet(e: Event) {
      e.stopPropagation();
    },
  },

  mounted() {
    const body = document.getElementsByTagName('body')
    if (body) {
      body[0].classList.add('overflow-hidden')
    }
  },

  unmounted() {
    const body = document.getElementsByTagName('body')
    if (body) {
      body[0].classList.remove('overflow-hidden')
    }
  }
});
</script>

<style src="./dialog.scss" lang="scss" scoped></style>
