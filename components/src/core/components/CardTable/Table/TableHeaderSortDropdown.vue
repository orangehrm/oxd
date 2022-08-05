<template>
  <div
    class="oxd-table-header-sort"
    @keyup.esc="closeDropdown"
    v-click-outside="closeDropdown"
  >
    <oxd-icon-button
      :withContainer="false"
      :name="sortIcon"
      size="extra-small"
      class="oxd-table-header-sort-icon"
      tabindex="0"
      ref="oxdIcon"
      @click="toggleDropdown($event)"
      @keydown.enter="openDropdown($event)"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
      @keydown.tab="closeDropdown"
    />
    <div
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
          class="oxd-table-header-sort-dropdown-item"
          @click="$emit('order', 'ASC')"
          @keydown.enter.prevent="$emit('order', 'ASC')"
        >
          <oxd-icon :name="sortIconAsc" size="extra-small" />
          <oxd-text tag="span">{{ $vt('Ascending') }}</oxd-text>
        </li>
        <li
          ref="bottomDropdownElement"
          tabindex="-1"
          class="oxd-table-header-sort-dropdown-item"
          @click="$emit('order', 'DESC')"
          @keydown.enter.prevent="$emit('order', 'DESC')"
        >
          <oxd-icon :name="sortIconDesc" size="extra-small" />
          <oxd-text tag="span">{{ $vt('Descending') }}</oxd-text>
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
import translateMixin from '../../../../mixins/translate';

export default defineComponent({
  name: 'oxd-card-th-sort',

  inheritAttrs: false,

  props: {
    order: {
      type: Object,
      required: false,
    },
  },

  emits: ['order'],

  components: {
    'oxd-text': Text,
    'oxd-icon': Icon,
    'oxd-icon-button': IconButton,
  },

  mixins: [translateMixin],

  directives: {
    'click-outside': clickOutsideDirective,
  },

  data() {
    return {
      isActive: false,
    };
  },

  methods: {
    toggleDropdown() {
      if (!this.isActive) {
        this.openDropdown();
      } else {
        this.closeDropdown();
      }
    },
    openDropdown() {
      this.isActive = true;
      if (this.sortIcon === this.sortIconDesc) {
        this.$nextTick(() => {
          this.$refs.bottomDropdownElement.focus();
        });
      } else {
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
        switch (this.order.order as Order) {
          case 'ASC':
            icon =
              this.order.iconAsc !== '' ? this.order.iconAsc : 'oxd-sort-asc';
            break;
          case 'DESC':
            icon =
              this.order.iconDesc !== ''
                ? this.order.iconDesc
                : 'oxd-sort-desc';
            break;
          default:
            icon = 'oxd-sort';
        }
      }
      return icon;
    },

    sortIconAsc(): string {
      return this.order.iconAsc !== '' ? this.order.iconAsc : 'oxd-sort-asc';
    },

    sortIconDesc(): string {
      return this.order.iconDesc !== '' ? this.order.iconDesc : 'oxd-sort-desc';
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
