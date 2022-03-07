<template>
  <div class="oxd-table-header-sort" @keyup.esc="closeDropdown">
    <oxd-icon-button
        :withContainer="false"
        :name="sortIcon"
        size="extra-small"
        class="oxd-table-header-sort-icon"
        tabindex="0"
        ref="oxdIcon"
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
            ref="topDropdownElement"
            tabindex="-1"
            class="oxd-table-header-sort-dropdown-item ascending"
            @click="$emit('order', 'ASC')"
            @keydown.enter.prevent="$emit('order', 'ASC')"
        >
          <oxd-icon name="oxd-sort-asc" size="extra-small"/>
          <oxd-text tag="span">Ascending</oxd-text>
        </li>
        <li
            ref="bottomDropdownElement"
            tabindex="-1"
            class="oxd-table-header-sort-dropdown-item descending"
            @click="$emit('order', 'DESC')"
            @keydown.enter.prevent="$emit('order', 'DESC')"
        >
          <oxd-icon name="oxd-sort-desc" size="extra-small"/>
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
    openDropdown($e: Event) {
      this.isActive = true;
      if(this.sortIcon === 'oxd-sort-desc'){
        this.$nextTick(() => {
          this.$refs.bottomDropdownElement.focus();
        });
      }
      else{
        this.$nextTick(() => {
          this.$refs.topDropdownElement.focus();
        });
      }
    },
    closeDropdown() {
      if (this.isActive) {
        this.isActive = false;
        this.$refs.oxdIcon.$el.focus();
      }
    },
    onSelectDown() {
      this.$refs.bottomDropdownElement.focus();
    },
    onSelectUp() {
      this.$refs.topDropdownElement.focus();
    },
  },

  computed: {
    sortIcon(): string {
      let icon = '';
      if (this.order !== undefined) {
        switch (this.order as Order) {
          case 'ASC':
            icon = 'oxd-sort-asc';
            break;
          case 'DESC':
            icon = 'oxd-sort-desc';
            break;
          default:
            icon = 'oxd-sort';
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
