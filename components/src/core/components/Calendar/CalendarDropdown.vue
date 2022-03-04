<template>
  <li
    tabindex="0"
    ref="dropdownSelector"
    v-click-outside="closeSubMenu"
    :class="{'--active': isActive}"
    @click="openSubmenu"
    @keyup.enter="openSubmenu"
    @keyup.esc="closeSubMenu"
  >
    <slot></slot>
    <transition name="transition-fade-down">
      <ul
        v-if="isActive"
        class="oxd-calendar-dropdown"
        role="menu"
        tabindex="-1"
        @click.stop="closeSubMenu"
        @keyup.enter.stop="closeSubMenu"
        @keyup.esc="closeSubMenu"
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
      this.$refs.dropdownSelector.focus();
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
