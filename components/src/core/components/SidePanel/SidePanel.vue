<template>
  <aside class="oxd-sidepanel" :class="classes">
    <nav class="oxd-navbar-nav" role="navigation" aria-label="Sidepanel">
      <div class="oxd-sidepanel-header">
        <oxd-branding :toggle="toggle" :image-src="brandImageSrc" />
        <oxd-icon
          name="x"
          class="oxd-sidepanel-header-close"
          @click="$emit('collapse')"
        />
      </div>
      <div class="oxd-sidepanel-body">
        <oxd-main-menu
          @collapse="$emit('collapse')"
          :toggle="toggle"
          :menu-items="menuItems"
        />
      </div>
    </nav>
  </aside>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import Branding from './Branding.vue';
import MainMenu from './MainMenu.vue';
import MenuItem from './menuItem.interface';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'oxd-side-panel',

  emits: ['collapse'],

  props: {
    toggle: {
      type: Boolean,
      default: false,
    },
    brandImageSrc: {
      type: String,
      default: '',
    },
    menuItems: {
      type: Array as PropType<MenuItem[]>,
      default: () => [],
    },
  },

  components: {
    'oxd-branding': Branding,
    'oxd-main-menu': MainMenu,
    'oxd-icon': Icon,
  },

  computed: {
    classes(): object {
      return {
        toggled: this.toggle,
      };
    },
  },
});
</script>

<style src="./sidepanel.scss" lang="scss" scoped></style>
