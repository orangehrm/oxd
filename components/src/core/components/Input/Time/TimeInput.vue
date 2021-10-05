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
  <div v-click-outside="onFocusOut" class="oxd-time-wrapper">
    <div class="oxd-time-input">
      <oxd-input
        ref="oxdInput"
        :hasError="hasError"
        :disabled="disabled"
        :readonly="readonly"
        :value="timeDisplay"
        :placeholder="placeholder"
        @change="onTimeInput"
        @click="toggleDropdown"
      />
      <oxd-icon :class="timeIconClasses" name="clock" @click="toggleDropdown" />
    </div>
    <oxd-time-picker
      v-if="open"
      v-model="timeInput"
      :step="step"
    ></oxd-time-picker>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, watchEffect} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import clickOutsideDirective from '../../../../directives/click-outside';
import TimePicker from '@orangehrm/oxd/core/components/Input/Time/TimePicker.vue';
import {parseDate, formatDate} from '../../../../utils/date';

export default defineComponent({
  name: 'oxd-time-input',

  components: {
    'oxd-icon': Icon,
    'oxd-input': Input,
    'oxd-time-picker': TimePicker,
  },

  emits: [
    'update:modelValue',
    'timeselect:opened',
    'timeselect:closed',
    'blur',
  ],

  props: {
    modelValue: {
      type: String,
      default: '',
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    step: {
      type: Number,
      default: 1,
    },
  },

  directives: {
    'click-outside': clickOutsideDirective,
  },

  setup(props, context) {
    const state = reactive({
      open: false,
      timeInput: props.modelValue,
    });

    watchEffect(() => {
      context.emit('update:modelValue', state.timeInput);
    });

    return {
      ...toRefs(state),
    };
  },

  methods: {
    onFocusOut() {
      this.open && this.closeDropdown();
    },
    onTimeInput($event: Event) {
      const input = ($event.target as HTMLInputElement).value;
      this.timeInput = formatDate(parseDate(input, 'hh:mm a'), 'HH:mm');
    },
    toggleDropdown() {
      if (!this.disabled) {
        if (!this.open) {
          this.$refs.oxdInput.$el.focus();
          this.openDropdown();
        } else {
          this.closeDropdown();
        }
      }
    },
    openDropdown() {
      this.open = true;
      this.$emit('timeselect:opened');
    },
    closeDropdown() {
      this.open = false;
      this.$emit('timeselect:closed');
    },
  },

  computed: {
    timeIconClasses(): object {
      return {
        'oxd-time-input--clock': true,
        '--disabled': this.disabled,
        '--readonly': this.readonly,
      };
    },
    timeDisplay(): string {
      return formatDate(parseDate(this.modelValue, 'HH:mm'), 'hh:mm a');
    },
  },
});
</script>

<style src="./time-input.scss" lang="scss" scoped></style>
