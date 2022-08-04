<template>
  <!-- Search -->
  <div class="oxd-main-menu --fixed">
    <div class="oxd-main-menu-search">
      <i class="oxd-menu-icon icon-search"></i>
      <oxd-input
        v-model="searchTerm"
        placeholder="Search"
        :class="{toggled: toggle}"
      />
      <oxd-icon-button
        @click="$emit('collapse')"
        :name="toggle ? 'chevron-right' : 'chevron-left'"
        class="oxd-main-menu-button"
        role="none"
      />
    </div>
    <hr class="oxd-main-menu-divider" />
  </div>
  <!-- Search -->

  <!-- Nav Items  -->
  <ul class="oxd-main-menu">
    <oxd-main-menu-item
      v-for="(menuItem, index) in filteredMenuItems"
      :key="`oxd-main-menu-${index}`"
      :url="menuItem.url"
      :active="menuItem.active"
      :collapsed="toggle"
      :name="menuItem.name"
      :icon="menuItem.icon"
    ></oxd-main-menu-item>
  </ul>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import MainMenuItem from './MainMenuItem.vue';
import MenuItem from './menuItem.interface';

export default defineComponent({
  name: 'oxd-main-menu',

  emits: ['collapse'],

  data() {
    return {
      searchTerm: '',
    };
  },

  props: {
    url: {
      type: String,
      default: '/',
    },
    toggle: {
      type: Boolean,
      default: false,
    },
    menuItems: {
      type: Object as PropType<MenuItem[]>,
    },
  },

  components: {
    'oxd-input': Input,
    'oxd-main-menu-item': MainMenuItem,
    'oxd-icon-button': IconButton,
  },

  computed: {
    classes(): object {
      return {
        toggled: this.toggle,
      };
    },
    filteredMenuItems(): MenuItem[] {
      const filter = new RegExp(this.searchTerm, 'i');
      return this.menuItems.filter(item => item.name.match(filter));
    },
  },
});
</script>

<style src="./main-menu.scss" lang="scss" scoped></style>
