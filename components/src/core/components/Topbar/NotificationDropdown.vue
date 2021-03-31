<template>
  <!-- Notification dropdown -->
  <oxd-dropdown-menu class="oxd-notifdropdown">
    <span class="oxd-notifdropdown-tab">
      <oxd-icon
        class="oxd-notifdropdown-icon"
        name="bell-fill"
        :with-container="false"
      />
      <span class="oxd-notifdropdown-count">30</span>
    </span>
    <template v-slot:content>
      <!-- Notification items -->
      <span class="oxd-notifdropdown-head">
        Alerts Center
      </span>
      <hr class="oxd-notifdropdown-divider" />
      <slot></slot>
      <hr class="oxd-notifdropdown-divider" />
      <li role="none">
        <a href="#" role="menuitem" class="oxd-notifdropdown-link --center">
          Show All Notifications
        </a>
      </li>
    </template>
  </oxd-dropdown-menu>
  <!-- Notification dropdown -->
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import DropdownMenu from '@orangehrm/oxd/core/components/DropdownMenu/DropdownMenu.vue';

export default defineComponent({
  name: 'oxd-notification-dropdown',
  components: {
    'oxd-icon': Icon,
    'oxd-dropdown-menu': DropdownMenu,
  },
});
</script>

<style src="./notification-dropdown.scss" lang="scss" scoped></style>
<style lang="scss">
.oxd-notifdropdown {
  & .oxd-dropdown-menu {
    right: 0;
    left: unset;
    top: 50px;
    min-width: 10rem;
  }
}
</style>
