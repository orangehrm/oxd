<template>
  <li class="oxd-main-menu-item-wrapper">
    <a :class="menuClasses" :href="url">
      <i :class="iconClasses"></i>
      <oxd-text
        tag="span"
        :class="{'oxd-main-menu-item--name': true, active: active}"
        >{{ name }}</oxd-text
      >
    </a>
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';

export default defineComponent({
  name: 'oxd-main-menu-item',

  props: {
    url: {
      type: String,
      default: '#',
    },
    active: {
      type: Boolean,
      default: false,
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'icon-home',
    },
  },

  components: {
    'oxd-text': Text,
  },

  computed: {
    iconClasses(): object {
      return {
        'oxd-menu-icon': true,
        [this.icon]: !this.active,
        [`${this.icon}-w`]: this.active,
      };
    },
    menuClasses(): object {
      return {
        'oxd-main-menu-item': true,
        active: this.active,
        toggle: this.collapsed,
      };
    },
  },
});
</script>

<style src="./main-menu.scss" lang="scss" scoped></style>
<style lang="scss">
@import '../../../styles/colors';
.oxd-main-menu-button i {
  color: $oxd-white-color !important;
  font-size: 10px;
}
</style>
