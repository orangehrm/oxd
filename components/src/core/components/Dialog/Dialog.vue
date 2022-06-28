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
          v-focus-trap
          role="document"
          @keydown="onEscape"
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
import {defineComponent} from 'vue';
import Overlay from '@orangehrm/oxd/core/components/Dialog/Overlay.vue';
import CloseButton from '@orangehrm/oxd/core/components/Dialog/CloseButton.vue';
import Sheet from '@orangehrm/oxd/core/components/Sheet/Sheet.vue';
import focusTrapDirective from '../../../directives/focus-trap';

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

  directives: {
    'focus-trap': focusTrapDirective,
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
  },

  computed: {
    classes(): object {
      return {
        'oxd-dialog-sheet': true,
        'oxd-dialog-sheet--shadow': this.shadow,
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

    onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        this.$emit('update:show', false);
      }
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
    window.addEventListener('keyup', this.onEscape);
    const body = document.getElementsByTagName('body');
    if (body) {
      body[0].classList.add('overflow-hidden');
    }
  },

  unmounted() {
    window.removeEventListener('keyup', this.onEscape);
    const body = document.getElementsByTagName('body');
    if (body) {
      body[0].classList.remove('overflow-hidden');
    }
  },
});
</script>

<style src="./dialog.scss" lang="scss" scoped></style>
