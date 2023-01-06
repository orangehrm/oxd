<template>
  <div class="oxd-pop-over">
    <div @click="openPopOver" class="oxd-pop-over-button">
      <slot name="button"></slot>
    </div>
    <transition name="transition-fade-down">
      <div
        class="oxd-pop-over-content"
        v-if="isActive"
        v-click-outside="closePopOver"
        role="dialog"
        @keyup.esc="closePopOver"
        v-focus-trap
        v-dropdown-direction
        v-horizontal-direction
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import clickOutsideDirective from '../../../directives/click-outside';
import dropdownDirectionDirective from '../../../directives/dropdown-direction';
import popoverHorizontalDirectionDirectiveDirectionDirective from '../../../directives/popover-direction';
import focusTrapDirective from '../../../directives/focus-trap';

export default defineComponent({
  name: 'oxd-pop-over',

  directives: {
    'click-outside': clickOutsideDirective,
    'dropdown-direction': dropdownDirectionDirective,
    'horizontal-direction': popoverHorizontalDirectionDirectiveDirectionDirective,
    'focus-trap': focusTrapDirective,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:show'],
  // eslint-disable-next-line
  setup: function(props: any) {
    const isActive = ref<boolean>(props.show);
    const openPopOver = () => {
      isActive.value = !isActive.value;
    };
    const closePopOver = (e: Event) => {
      if (isActive.value) {
        isActive.value = false;
      }
      e.stopImmediatePropagation();
    };

    //isActive value set to false, when the props.show value change triggered
    watch(
      () => props.show,
      () => {
        isActive.value = false;
      },
    );

    return {
      isActive,
      openPopOver,
      closePopOver,
    };
  },
});
</script>

<style src="./pop-over.scss" lang="scss" scoped></style>
