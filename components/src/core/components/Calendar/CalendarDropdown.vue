<template>
  <li
    tabindex="0"
    ref="dropdownSelector"
    v-click-outside="closeSubMenu"
    :class="{'--active': isActive}"
    @click="toggleSubmenu"
    @keyup.enter="openSubmenu"
    @keyup.esc="closeSubMenu"
  >
    <slot></slot>
    <transition name="transition-fade-down">
      <ul
        v-if="isActive"
        ref="oxdCalendarDropdown"
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
    toggleSubmenu() {
      this.isActive = !this.isActive;
      if (this.isActive) {
        this.openSubmenu();
      }
    },
    openSubmenu() {
      this.isActive = true;
      this.$refs.dropdownSelector.focus();
      this.$nextTick(() => {
        const selectedItem = this.$refs.oxdCalendarDropdown.querySelector(
          '.oxd-calendar-selector.--selected',
        );
        selectedItem.scrollIntoView({block: 'nearest', inline: 'nearest'});
      });
    },
    closeSubMenu($e: KeyboardEvent | null) {
      if (this.isActive) {
        if ($e && $e.key === 'Escape') $e.stopPropagation();
        this.isActive = false;
        this.$refs.dropdownSelector.focus();
      }
    },
  },
});
</script>

<style src="./calendar-dropdown.scss" lang="scss" scoped></style>
