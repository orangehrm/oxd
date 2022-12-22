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
  <div :class="rootClasses">
    <slot name="label">
      <div class="oxd-input-group__label-wrapper">
        <oxd-icon
          v-if="labelIcon"
          :name="labelIcon"
          class="oxd-input-group__label-icon"
        />
        <oxd-label v-if="label" :label="label" :class="labelClasses" />
      </div>
    </slot>
    <div :class="wrapperClasses">
      <slot></slot>
    </div>
    <slot name="message">
      <oxd-text v-if="message" :class="messageClasses" tag="span">
        {{ message }}
      </oxd-text>
    </slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Label from '@ohrm/oxd/core/components/Label/Label.vue';
import Text from '@ohrm/oxd/core/components/Text/Text.vue';
import Icon from '@ohrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'OxdInputGroup',

  components: {
    'oxd-label': Label,
    'oxd-text': Text,
    'oxd-icon': Icon,
  },

  props: {
    label: {
      type: String,
    },
    labelIcon: {
      type: String,
    },
    message: {
      type: String,
    },
    classes: {
      type: Object,
      default: () => {
        return {
          label: {},
          message: {},
          wrapper: {},
        };
      },
    },
  },

  computed: {
    rootClasses(): object {
      return {
        'oxd-input-group': true,
      };
    },
    labelClasses(): object {
      return {
        ...this.classes.label,
      };
    },
    messageClasses(): object {
      return {
        ...this.classes.message,
        'oxd-input-group__message': true,
      };
    },
    wrapperClasses(): object {
      const {wrapper} = this.classes;
      return wrapper ? wrapper : {};
    },
  },
});
</script>

<style src="./input-group.scss" lang="scss" scoped></style>
