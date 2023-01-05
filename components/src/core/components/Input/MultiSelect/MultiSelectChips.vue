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
  <div class="oxd-multiselect-chips-area">
    <oxd-chip
      v-for="(option, index) in selected"
      :key="`${index}-selected-${option.id}`"
      :label="option.label"
      class="oxd-multiselect-chips-selected"
    >
      <oxd-icon
        name="x"
        :class="{
          '--clear': true,
          '--disabled': disabled,
          '--readonly': readonly,
        }"
        @click="onClick(option)"
      />
    </oxd-chip>
  </div>
</template>

<script lang="ts">
import {Option} from '../types';
import {defineComponent, PropType} from 'vue';
import Chip from '@ohrm/oxd/core/components/Chip/Chip.vue';
import Icon from '@ohrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'OxdMutliselectChips',

  components: {
    'oxd-chip': Chip,
    'oxd-icon': Icon,
  },

  props: {
    disabled: {
      type: Boolean,
      require: false,
      default: false,
    },
    readonly: {
      type: Boolean,
      require: false,
      default: false,
    },
    selected: {
      type: Array as PropType<Option[]>,
      require: false,
      default: () => [],
    },
  },

  emits: ['chipRemoved'],

  methods: {
    onClick(option: Option) {
      if (this.disabled || this.readonly) return;
      this.$emit('chipRemoved', option);
    },
  },
});
</script>

<style src="./multiselect-input.scss" lang="scss" scoped></style>
