<template>
  <div class="oxd-pop-over" style="margin-left: 90%">
    <div @click="openSubmenu"

    >
      <slot name="button"></slot>
    </div>
    <transition name="transition-fade-down">
      <div
          class="oxd-pop-over-content"
          v-if="isActive"
          v-click-outside="closeSubMenu"
          v-horizontal-direction
          role="dialog"

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


export default defineComponent({
  name: 'oxd-pop-over',

  directives: {
    'click-outside': clickOutsideDirective,
    'dropdown-direction': dropdownDirectionDirective,
    'horizontal-direction': popoverHorizontalDirectionDirectiveDirectionDirective,
  },

  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['update:show'],

  setup: function (props: any) {
    const isActive = ref<boolean>(false);
    const isRight = ref<boolean>(false);
    const openSubmenu = () => {
      isActive.value = true;
    };
    const closeSubMenu = () => {
      if (isActive.value) {
        isActive.value = false;
      }
    };

    //isActive value set to false, when the props.show value change triggered
    watch(
        () => props.show,
        (val) => {
          isActive.value = false;
        }
    );

    return {
      isActive,
      openSubmenu,
      closeSubMenu,

      isRight,
    };
  },
});
</script>

<style src="./pop-over.scss" lang="scss" scoped></style>
