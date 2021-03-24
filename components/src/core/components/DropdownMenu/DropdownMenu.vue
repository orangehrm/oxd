<template>
  <li @click="openSubmenu" :class="{'--active': isActive}">
    <slot></slot>
    <transition name="transition-fade-down">
      <ul v-if="isActive" class="oxd-dropdown-menu" role="menu">
        <slot name="content"></slot>
      </ul>
    </transition>
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-dropdown-menu',

  data() {
    return {
      isActive: false,
    };
  },

  methods: {
    openSubmenu() {
      this.isActive = true;
    },
    closeSubMenu(event: Event) {
      if (!(this.$el == event.target || this.$el.contains(event.target))) {
        this.isActive = false;
      }
    },
  },

  beforeMount() {
    document.body.addEventListener('click', this.closeSubMenu);
  },

  beforeUnmount() {
    document.body.removeEventListener('click', this.closeSubMenu);
  },
});
</script>

<style src="./dropdownMenu.scss" lang="scss" scoped></style>
