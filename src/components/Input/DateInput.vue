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
  <div class="oxd-date-wrapper">
    <div class="oxd-date-input">
      <oxd-input
        ref="oxdInput"
        :has-error="hasError"
        :disabled="disabled"
        :readonly="readonly"
        :value="displayDate"
        :placeholder="placeholder"
        @blur="onBlur"
        @click="toggleDropdown"
        @update:model-value="onDateTyped"
      />
      <oxd-icon
        name="calendar"
        :class="dateIconClasses"
        @click="toggleDropdown"
      />
    </div>
    <transition name="transition-fade-down">
      <div v-if="open" class="oxd-date-input-calendar">
        <oxd-calendar
          v-bind="$attrs"
          v-model="dateSelected"
          :locale="locale"
          @mousedown.prevent
          @update:model-value="onDateSelected"
        >
          <div class="oxd-date-input-links">
            <div class="oxd-date-input-link --today" @click="onClickToday">
              {{ t('general.today', 'Today') }}
            </div>
            <div class="oxd-date-input-link --clear" @click="onClickClear">
              {{ t('general.clear', 'Clear') }}
            </div>
            <div class="oxd-date-input-link --close" @click="closeDropdown">
              {{ t('general.close', 'Close') }}
            </div>
          </div>
        </oxd-calendar>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import type {Locale} from 'date-fns';
import {enGB} from 'date-fns/locale';
import usei18n from '@/composables/usei18n';
import Icon from '@/components/Icon/Icon.vue';
import Input from '@/components/Input/Input.vue';
import {toRefs, reactive, defineComponent} from 'vue';
import type {PropType, ComponentPublicInstance} from 'vue';
import Calendar from '@/components/Calendar/Calendar.vue';
import {formatDate, parseDate, freshDate} from '@/utils/date';

export default defineComponent({
  name: 'OxdDateInput',

  components: {
    'oxd-icon': Icon,
    'oxd-input': Input,
    'oxd-calendar': Calendar,
  },

  inheritAttrs: false,

  props: {
    modelValue: {
      type: String,
      required: false,
      default: null,
    },
    hasError: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    ioformat: {
      type: String,
      required: false,
      default: 'yyyy-MM-dd',
    },
    displayFormat: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: String,
      required: false,
      default: null,
    },
    locale: {
      type: Object as PropType<Locale>,
      required: false,
      default: () => enGB,
    },
  },

  emits: [
    'blur',
    'update:modelValue',
    'dateselect:opened',
    'dateselect:closed',
  ],

  setup() {
    const state = reactive<{open: boolean; dateTyped: string | null}>({
      open: false,
      dateTyped: null,
    });

    return {
      ...usei18n(),
      ...toRefs(state),
    };
  },

  computed: {
    dateSelected: {
      get() {
        return parseDate(this.modelValue, this.ioformat) || undefined;
      },
      set(value: Date) {
        if (!isNaN(value?.valueOf()) && value instanceof Date) {
          this.$emit('update:modelValue', formatDate(value, this.ioformat));
        } else {
          this.$emit(
            'update:modelValue',
            this.dateTyped ? this.dateTyped : null,
          );
        }
      },
    },
    displayDate(): string | null {
      if (this.value) {
        return this.value;
      } else if (this.dateSelected) {
        return formatDate(this.dateSelected, this.dateFormat, {
          locale: this.locale,
        });
      } else if (this.modelValue === null) {
        return this.modelValue;
      } else {
        return this.dateTyped;
      }
    },
    dateFormat(): string {
      return this.displayFormat && this.displayFormat.trim()
        ? this.displayFormat
        : this.ioformat;
    },
    dateIconClasses(): object {
      return {
        'oxd-date-input-icon': true,
        '--disabled': this.disabled,
        '--readonly': this.readonly,
      };
    },
  },

  methods: {
    onBlur(e: Event) {
      e.stopImmediatePropagation();
      if (this.dateTyped !== null) {
        this.dateSelected =
          parseDate(this.dateTyped, this.dateFormat, {
            locale: this.locale,
          }) || undefined;
      }
      this.$emit('blur');
      this.closeDropdown();
    },
    onDateTyped(value: string) {
      this.dateTyped = value;
    },
    onDateSelected() {
      this.dateTyped = null;
      this.closeDropdown();
    },
    toggleDropdown() {
      if (!this.disabled && !this.readonly) {
        if (!this.open) {
          this.openDropdown();
          (this.$refs.oxdInput as ComponentPublicInstance).$el.focus();
        } else {
          this.closeDropdown();
        }
      }
    },
    openDropdown() {
      this.open = true;
      this.$emit('dateselect:opened');
    },
    closeDropdown() {
      this.open = false;
      this.$emit('dateselect:closed');
    },
    onClickToday() {
      this.open = false;
      this.dateTyped = null;
      this.dateSelected = freshDate();
    },
    onClickClear() {
      this.open = false;
      this.dateTyped = null;
      this.dateSelected = undefined;
    },
  },
});
</script>

<style src="./date-input.scss" lang="scss" scoped></style>
