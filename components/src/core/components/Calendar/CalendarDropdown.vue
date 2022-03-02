<template>
  <li
    @click="openSubmenu"
    @keyup.enter="openSubmenu"
    @keyup.esc="closeSubMenu"
    v-click-outside="closeSubMenu"
    :class="{'--active': isActive}"
    tabindex="0"
    ref="dropdownSelector"
  >
    <slot></slot>
    <transition name="transition-fade-down">
      <ul
        @click.stop="closeSubMenu"
        @keyup.enter.stop="closeSubMenu"
        @keyup.esc="closeSubMenu"
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
    closeSubMenu($e: KeyboardEvent | null) {
      if ($e && $e.key === 'Escape') $e.stopPropagation();
      if (this.isActive) {
        this.isActive = false;
        this.$refs.dropdownSelector.focus();
      }
    },
  },
});
</script>

<style src="./calendar-dropdown.scss" lang="scss" scoped></style>
