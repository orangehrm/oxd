<!--
/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */
-->

<template>
  <nav
    ref="navbar"
    role="navigation"
    aria-label="Topbar Menu"
    class="oxd-topbar-body-nav"
  >
    <ul>
      <oxd-navigation-link
        v-for="(menuItem, index) in visibleMenuItems"
        :ref="setMenuItem"
        :key="`nav-level1-${index + width}`"
        :menu-item="menuItem"
        :class="menuClasses[index]"
      >
      </oxd-navigation-link>

      <oxd-navigation-more
        v-if="hiddenMenuItems.length > 0"
        :menu-items="hiddenMenuItems"
      >
      </oxd-navigation-more>

      <div class="oxd-topbar-body-nav-slot">
        <slot></slot>
      </div>
    </ul>
  </nav>
</template>

<script lang="ts">
import {
  ref,
  watch,
  nextTick,
  computed,
  onMounted,
  onBeforeUpdate,
  defineComponent,
} from 'vue';
import type {TopMenuItem} from './types';
import useResize from '@/composables/useResize';
import type {PropType, ComponentPublicInstance} from 'vue';
import NavigationLink from '@/components/Topbar/NavigationLink.vue';
import NavigationMore from '@/components/Topbar/NavigationMore.vue';

export default defineComponent({
  name: 'OxdNavigation',

  components: {
    'oxd-navigation-link': NavigationLink,
    'oxd-navigation-more': NavigationMore,
  },

  props: {
    menuItems: {
      type: Array as PropType<TopMenuItem[]>,
      required: false,
      default: () => [],
    },
  },

  setup(props, context) {
    const lastMenuItemWidth = ref(0);
    const navbar = ref<HTMLElement>();
    const visibleMenuItems = ref(props.menuItems);
    const hiddenMenuItems = ref<TopMenuItem[]>([]);
    const menuItemsRefs = ref<ComponentPublicInstance[]>([]);
    const {width} = useResize(navbar);

    const setMenuItem = ($el: ComponentPublicInstance | null) => {
      if ($el) menuItemsRefs.value.push($el);
      return undefined;
    };

    const menuClasses = computed(() => {
      return props.menuItems.map((item) => {
        return {
          'oxd-topbar-body-nav-tab': true,
          '--parent': item.children.length > 0,
          '--visited': item.active,
        };
      });
    });

    const getHTMLElementWidth = ($el: HTMLElement) => {
      const elStyles = window.getComputedStyle($el);
      return $el.clientWidth + parseInt(elStyles.marginRight);
    };

    const arrangeMenuItems = (menuItems: ComponentPublicInstance[]) => {
      // offset the width of "more" element
      let widthOffset = hiddenMenuItems.value.length > 0 ? 80 : 0;
      if (context.slots.default?.()) widthOffset += 35;
      const menuItemsWidth = menuItems.reduce((acc, menuItem) => {
        return acc + getHTMLElementWidth(menuItem.$el);
      }, widthOffset);

      // if total with of menu items is greater than nav bar
      // remove last menu, add it to hidden menu + store it's width
      if (menuItemsWidth > width.value) {
        lastMenuItemWidth.value = getHTMLElementWidth(
          menuItems[menuItems.length - 1].$el,
        );
        const lastMenuItem = visibleMenuItems.value.pop();
        if (lastMenuItem) hiddenMenuItems.value.unshift(lastMenuItem);
      }

      if (
        hiddenMenuItems.value.length > 0 &&
        width.value > menuItemsWidth + lastMenuItemWidth.value
      ) {
        nextTick().then(() => {
          const lastHiddenMenuItem = hiddenMenuItems.value.shift();
          if (lastHiddenMenuItem)
            visibleMenuItems.value.push(lastHiddenMenuItem);
        });
      }
    };

    // trigger menu side effects. ie: adding/removing items
    watch(menuItemsRefs, arrangeMenuItems);

    // arrange menu items once after dom loaded
    onMounted(async () => {
      await nextTick();
      arrangeMenuItems(menuItemsRefs.value);
    });

    onBeforeUpdate(() => {
      // reset menu refs array as vue re-render
      menuItemsRefs.value = [];
    });

    return {
      width,
      navbar,
      setMenuItem,
      menuClasses,
      menuItemsRefs,
      hiddenMenuItems,
      visibleMenuItems,
    };
  },
});
</script>

<style src="./navigation.scss" lang="scss" scoped></style>
