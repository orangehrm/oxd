<template>
  <div class="oxd-switch-wrapper">
    <label>
      <template v-if="labelPosition === 'left'">
        {{ optionLabel }}
      </template>
      <input
        type="checkbox"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        v-bind="$attrs"
        v-model="checked"
      />
      <span :class="classes" :style="style"> </span>
      <template v-if="labelPosition === 'right'">
        {{ optionLabel }}
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Position, LabelPositions} from './types';

export interface State {
  focused: boolean;
  checkedProxy: any;
}

export default defineComponent({
  name: 'oxd-switch-input',
  inheritAttrs: false,
  props: {
    modelValue: {},
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    optionLabel: {
      type: String,
      default: '',
    },
    labelPosition: {
      type: String,
      default: 'right',
      validator: function(value: Position) {
        return LabelPositions.indexOf(value) !== -1;
      },
    },
  },

  data(): State {
    return {
      focused: false,
      checkedProxy: {},
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-switch-input': true,
        'oxd-switch-input--active': !this.focused,
        'oxd-switch-input--focus': this.focused,
        'oxd-switch-input--error': this.hasError,
        [`--label-${this.labelPosition}`]: true,
      };
    },
    checked: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.checkedProxy = value;
      },
    },
  },

  methods: {
    onFocus(e: Event) {
      this.focused = true;
      this.$emit('focus', e);
    },
    onBlur(e: Event) {
      this.focused = false;
      this.$emit('blur', e);
    },
    onChange(e: Event) {
      this.$emit('update:modelValue', this.checkedProxy);
      this.$emit('change', e);
    },
  },
});
</script>

<style src="./switch-input.scss" lang="scss" scoped></style>
