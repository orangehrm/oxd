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
  <li>
    <button type="button" :class="classes">
      <oxd-icon v-if="previous" name="chevron-left" />
      <oxd-icon v-else-if="next" name="chevron-right" />
      <template v-else>{{ page }}</template>
    </button>
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@ohrm/oxd/core/components/Icon/Icon.vue';
import {pageableMixin} from '../../../mixins/pageable';

export default defineComponent({
  name: 'OxdPaginationPageItem',

  components: {
    'oxd-icon': Icon,
  },

  mixins: [pageableMixin],

  props: {
    previous: {
      type: Boolean,
    },
    next: {
      type: Boolean,
    },
    selected: {
      type: Boolean,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-pagination-page-item': true,
        'oxd-pagination-page-item--page': !(this.previous || this.next),
        'oxd-pagination-page-item--page-selected': this.selected,
        'oxd-pagination-page-item--previous-next': this.previous || this.next,
      };
    },
  },
});
</script>

<style src="./page-item.scss" lang="scss" scoped></style>
