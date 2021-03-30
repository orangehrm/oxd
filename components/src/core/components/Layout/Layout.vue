<template>
  <div class="oxd-layout">
    <oxd-side-panel
      @collapse="onCollapse"
      :toggle="collapse"
      :menu-items="sidepanelMenuItems"
      :brand-image-src="brandImageSrc"
    >
    </oxd-side-panel>
    <div class="oxd-layout-container">
      <oxd-overlay
        @click="onCollapse"
        class="oxd-layout-overlay"
        :show="collapse"
      ></oxd-overlay>
      <oxd-top-bar
        @collapse="onCollapse"
        :context-title="contextTitle"
        :icon="icon"
        :menu-items="topbarMenuItems"
        :user="user"
      ></oxd-top-bar>
      <div class="oxd-layout-context">
        <slot></slot>
      </div>
      <div class="oxd-layout-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import Topbar from '@orangehrm/oxd/core/components/Topbar/Topbar.vue';
import SidePanel from '@orangehrm/oxd/core/components/SidePanel/SidePanel.vue';
import overlay from '@orangehrm/oxd/core/components/Dialog/Overlay.vue';
import MenuItem from '../SidePanel/menuItem.interface';
import {TopMenuItem} from '../Topbar/menuItem.interface';
import {User} from '../Topbar/user.interface';

export default defineComponent({
  name: 'oxd-layout',

  props: {
    icon: {
      type: String,
      default: '',
    },
    contextTitle: {
      type: String,
      required: true,
    },
    user: {
      type: Object as PropType<User>,
    },
    sidepanelMenuItems: {
      type: Object as PropType<MenuItem[]>,
      required: true,
    },
    topbarMenuItems: {
      type: Object as PropType<TopMenuItem[]>,
      required: true,
    },
    brandImageSrc: {
      type: String,
      required: true,
    },
  },

  components: {
    'oxd-side-panel': SidePanel,
    'oxd-top-bar': Topbar,
    'oxd-overlay': overlay,
  },

  data() {
    return {
      collapse: false,
    };
  },

  methods: {
    onCollapse() {
      this.collapse = !this.collapse;
    },
  },
});
</script>

<style src="./layout.scss" lang="scss" scoped></style>
