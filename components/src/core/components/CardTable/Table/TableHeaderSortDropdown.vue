<template>
  <div
      class="oxd-table-header-sort"
      @keyup.esc="closeDropdown"
  >
    <oxd-icon-button
      :withContainer="false"
      :name="sortIcon"
      class="oxd-table-header-sort-icon"
      tabindex="0"
      @click="openDropdown($event)"
      @keydown.enter="openDropdown($event)"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
      @keydown.tab="closeDropdown"
    />
    <div
      v-click-outside="closeDropdown"
      v-show="isActive"
      :class="classes"
      role="dropdown"
      tabindex="-1"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
      @keydown.tab="closeDropdown"
    >
      <ul
          role="menu"
          @click.stop="closeDropdown"
          @keydown.enter.prevent.stop="closeDropdown"
      >
        <li
          ref="firstItem"
          class="oxd-table-header-sort-dropdown-item"
          tabindex="-1"
          @click="$emit('order', 'ASC')"
          @keydown.enter.prevent="$emit('order', 'ASC')"
        >
          <oxd-icon name="sort-alpha-down" />
          <oxd-text tag="span">Ascending</oxd-text>
        </li>
        <li
          ref="secondItem"
          tabindex="-1"
          class="oxd-table-header-sort-dropdown-item"
          @click="$emit('order', 'DESC')"
          @keydown.enter.prevent="$emit('order', 'DESC')"
        >
          <oxd-icon name="sort-alpha-up" />
          <oxd-text tag="span">Decending</oxd-text>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {Order} from '../types';
import {defineComponent} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import clickOutsideDirective from '../../../../directives/click-outside';

export default defineComponent({
  name: 'oxd-card-th-sort',

  inheritAttrs: false,

  props: {
    order: {
      type: String,
      required: false,
    },
  },

  emits: ['order'],

  components: {
    'oxd-text': Text,
    'oxd-icon': Icon,
    'oxd-icon-button': IconButton,
  },

  directives: {
    'click-outside': clickOutsideDirective,
  },

  data() {
    return {
      isActive: false,
    };
  },

  methods: {
    openDropdown($e :Event) {
      this.isActive = true;
      this.$nextTick(() => {
        const firstFocusableElement = ($e?.target as Element).parentElement?.querySelector('.oxd-table-header-sort-dropdown-item');
        if(firstFocusableElement){
          (firstFocusableElement as HTMLElement).focus();
        }
      })
    },
    closeDropdown() {
      if (this.isActive) {
        this.isActive = false;
      }
    },
    onSelectDown(){
      this.$refs.secondItem.focus();
    },
    onSelectUp(){
      this.$refs.firstItem.focus();
    },
  },

  computed: {
    sortIcon(): string {
      let icon = '';
      if (this.order !== undefined) {
        switch (this.order as Order) {
          case 'ASC':
            icon = 'sort-alpha-down';
            break;
          case 'DESC':
            icon = 'sort-alpha-up';
            break;
          default:
            icon = 'arrow-down-up';
        }
      }
      return icon;
    },

    classes(): object {
      return {
        '--active': this.isActive,
        'oxd-table-header-sort-dropdown': true,
      };
    },
  },
});
</script>

<style src="./table-header-sort-dropdown.scss" lang="scss" scoped></style>
