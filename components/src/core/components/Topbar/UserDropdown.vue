<template>
  <!-- User dropdown -->
  <oxd-dropdown-menu class="oxd-userdropdown">
    <span class="oxd-userdropdown-tab">
      <img
        alt="profile picture"
        class="oxd-userdropdown-img"
        :src="profilePicUrl"
      />
      <p class="oxd-userdropdown-name">
        {{ user.firstName }} {{ user.lastName }}
      </p>
    </span>
    <template v-slot:content>
      <li role="none">
        <a :href="logoutUrl" role="menuitem" class="oxd-userdropdown-link">
          <oxd-icon name="box-arrow-right" :with-container="false" />Logout
        </a>
      </li>
    </template>
  </oxd-dropdown-menu>
  <!-- User dropdown -->
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {User} from './user.interface';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import DropdownMenu from '@orangehrm/oxd/core/components/DropdownMenu/DropdownMenu.vue';

export default defineComponent({
  name: 'oxd-user-dropdown',

  props: {
    user: {
      type: Object as PropType<User>,
    },
    logoutUrl: {
      type: String,
      default: '#',
    },
  },

  components: {
    'oxd-icon': Icon,
    'oxd-dropdown-menu': DropdownMenu,
  },

  computed: {
    profilePicUrl() {
      return this.user.profImgSrc != ''
        ? this.user.profImgSrc
        : require('../../../assets/images/user-default-400.png').default;
    },
  },
});
</script>

<style src="./user-dropdown.scss" lang="scss" scoped></style>
<style lang="scss">
.oxd-userdropdown {
  & .oxd-dropdown-menu {
    right: 0;
    left: unset;
    top: 50px;
    min-width: 10rem;
  }
}
</style>
