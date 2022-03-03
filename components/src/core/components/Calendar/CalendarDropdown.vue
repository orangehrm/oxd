<template>
  <li
    @click="openSubmenu"
    v-click-outside="closeSubMenu"
    :class="{'--active': isActive}"
  >
    <slot></slot>
    <transition name="transition-fade-down">
      <ul
        @click.stop="closeSubMenu"
        v-if="isActive"
        class="oxd-calendar-dropdown"
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

export default defineComponent({
  name: 'oxd-calendar-dropdown',

  data() {
    return {
      isActive: false,
    };
  },

  directives: {
    'click-outside': clickOutsideDirective,
  },

  methods: {
    openSubmenu() {
      this.isActive = true;
    },
    closeSubMenu() {
      if (this.isActive) {
        this.isActive = false;
      }
    },
  },
});
</script>

<style src="./calendar-dropdown.scss" lang="scss" scoped></style>
