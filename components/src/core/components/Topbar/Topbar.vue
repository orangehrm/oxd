<template>
  <header class="oxd-topbar">
    <div class="oxd-topbar-header">
      <!-- Context Header -->
      <div class="oxd-topbar-header-title">
        <i :class="iconClasses"></i>
        <oxd-icon
          name="list"
          class="oxd-topbar-header-hamburger"
          @click="$emit('collapse')"
        />
        <oxd-text tag="h6" class="oxd-topbar-header-title-text">
          {{ contextTitle }}
        </oxd-text>
      </div>
      <!-- User Menu -->
    </div>
    <div class="oxd-topbar-body">
      <oxd-navigation-level-one
        :menu-items="menuItems"
      ></oxd-navigation-level-one>
    </div>
  </header>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {TopMenuItem} from './menuItem.interface';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import NavigationLevelOne from '@orangehrm/oxd/core/components/Topbar/NavigationLevelOne.vue';

export default defineComponent({
  name: 'oxd-top-bar',

  emits: ['collapse'],

  props: {
    contextTitle: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'icon-home',
    },
    menuItems: {
      type: Object as PropType<TopMenuItem[]>,
    },
  },

  components: {
    'oxd-text': Text,
    'oxd-navigation-level-one': NavigationLevelOne,
    'oxd-icon': Icon,
  },

  computed: {
    iconClasses(): object {
      return {
        'oxd-menu-icon': true,
        [`${this.icon}-w`]: true,
      };
    },
  },
});
</script>

<style src="./topbar.scss" lang="scss" scoped></style>
