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
  <div v-if="show" :class="classes" aria-live="assertive" @click="onClickToast">
    <div class="oxd-toast-start">
      <slot name="icon">
        <oxd-toast-icon :type="type" />
      </slot>
      <slot>
        <div :class="contentClasses">
          <oxd-text type="toast-title" class="oxd-toast-content-text">
            {{ title }}
          </oxd-text>
          <oxd-text type="toast-message" class="oxd-toast-content-text">
            {{ message }}
          </oxd-text>
        </div>
      </slot>
    </div>
    <slot name="close">
      <oxd-toast-close-button :type="type" @click="onClickClose" />
    </slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {toastMixin} from './toast-mixin';
import Text from '@/components/Text/Text.vue';
import ToastIcon from '@/components/Toast/Icon.vue';
import ToastCloseButton from '@/components/Toast/CloseButton.vue';

export default defineComponent({
  name: 'OxdToast',

  components: {
    'oxd-text': Text,
    'oxd-toast-icon': ToastIcon,
    'oxd-toast-close-button': ToastCloseButton,
  },

  mixins: [toastMixin],

  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: false,
      default: null,
    },
    show: {
      type: Boolean,
      required: false,
      default: false,
    },
    persistent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: ['update:show'],

  computed: {
    classes(): object {
      return {
        'oxd-toast': true,
        [`oxd-toast--${this.type}`]: true,
        ['oxd-toast--persistent']: this.persistent,
      };
    },
    contentClasses(): object {
      return {
        'oxd-toast-content': true,
        [`oxd-toast-content--${this.type}`]: true,
      };
    },
  },

  methods: {
    onClickToast() {
      if (!this.persistent) {
        this.$emit('update:show', false);
      }
    },
    onClickClose(e: Event) {
      e.stopPropagation();
      this.$emit('update:show', false);
    },
  },
});
</script>

<style src="./toast.scss" lang="scss" scoped></style>
