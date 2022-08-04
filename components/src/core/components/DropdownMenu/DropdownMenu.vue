<template>
  <li
    @click="openSubmenu"
    v-click-outside="closeSubMenu"
    :class="{'--active': isActive}"
  >
    <slot></slot>
    <transition name="transition-fade-down">
      <ul
        v-dropdown-direction
        @click.stop="closeSubMenu"
        v-if="isActive"
        class="oxd-dropdown-menu"
        role="menu"
      >
        <slot name="content"></slot>
      </ul>
    </transition>
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import clickOutsideDirective from '../../../directives/click-outside';
import dropdownDirectionDirective from '../../../directives/dropdown-direction';

export default defineComponent({
  name: 'oxd-dropdown-menu',

  data() {
    return {
      isActive: false,
    };
  },
  directives: {
    'click-outside': clickOutsideDirective,
    'dropdown-direction': dropdownDirectionDirective,
  },

  emits: ['show'],
  methods: {
    openSubmenu() {
      this.isActive = !this.isActive;
    },
    closeSubMenu() {
      if (this.isActive) {
        this.isActive = false;
      }
    },
  },
});
</script>

<style src="./dropdown-menu.scss" lang="scss" scoped></style>
