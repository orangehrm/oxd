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
  <transition :name="computedTransition" appear>
    <oxd-overlay role="dialog" centered :show="true" @click="onClickOverlay">
      <!--
    :aria-labelledby="'dialogTitle_' + id"
    :aria-describedby="'dialogDesc_' + id"
    -->
      <component :is="dialogContainer">
        <oxd-sheet
          :class="classes"
          :gutters="false"
          v-bind="$attrs"
          role="document"
          @click="onClickSheet"
        >
          <oxd-dialog-close-button
            v-if="withClose"
            class="oxd-dialog-close-button-position"
            @click="onClose"
          />
          <slot></slot>
        </oxd-sheet>
      </component>
    </oxd-overlay>
  </transition>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Overlay from '@ohrm/oxd/core/components/Dialog/Overlay.vue';
import CloseButton from '@ohrm/oxd/core/components/Dialog/CloseButton.vue';
import Sheet from '@ohrm/oxd/core/components/Sheet/Sheet.vue';

// Containers
import DefaultContainer from '@ohrm/oxd/core/components/Dialog/Container/Default.vue';

export default defineComponent({
  name: 'OxdDialog',

  components: {
    'oxd-overlay': Overlay,
    'oxd-dialog-close-button': CloseButton,
    'oxd-sheet': Sheet,

    // Containers
    'oxd-dialog-container-default': DefaultContainer,
  },
  inheritAttrs: false,

  props: {
    shadow: {
      type: Boolean,
      default: true,
    },
    withClose: {
      type: Boolean,
      default: true,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    dialogContainer: {
      type: String,
      default: 'oxd-dialog-container-default',
    },
    withTransition: {
      type: Boolean,
      default: true,
    },
    gutters: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['update:show'],

  computed: {
    classes(): object {
      return {
        'oxd-dialog-sheet': true,
        'oxd-dialog-sheet--shadow': this.shadow,
        'oxd-dialog-sheet--gutters': this.gutters,
      };
    },
    computedTransition(): string {
      return this.withTransition ? 'fade' : '';
    },
  },

  methods: {
    onClose() {
      this.$emit('update:show', false);
    },
    onClickOverlay() {
      if (!this.persistent) {
        this.$emit('update:show', false);
      }
    },
    onClickSheet(e: Event) {
      e.stopPropagation();
    },
  },
});
</script>

<style src="./dialog.scss" lang="scss" scoped></style>
