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

export default defineComponent({
  name: 'oxd-dropdown-menu',

  data() {
    return {
      isActive: false,
    };
  },
  props: {
    enableToggle: {
      type: Boolean,
      default: false,
    },
  },

  directives: {
    'click-outside': clickOutsideDirective,
  },

  emits: ['show'],
  methods: {
    openSubmenu() {
      if (this.enableToggle) {
        this.isActive = !this.isActive;
        this.$emit('show', this.isActive);
      } else {
        this.isActive = true;
      }
    },
    closeSubMenu() {
      if (this.isActive) {
        this.isActive = false;
        if (this.enableToggle) {
          this.$emit('show', this.isActive);
        }
      }
    },
  },
});
</script>

<style src="./dropdown-menu.scss" lang="scss" scoped></style>
