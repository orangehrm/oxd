<template>
  <div class="oxd-radio-wrapper">
    <label :class="labelClasses">
      <template v-if="labelPosition === 'left'">
        <div class="oxd-radio-option-label">
          {{ optionLabel }}
        </div>
      </template>
      <input
        type="radio"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        v-bind="$attrs"
        v-model="checked"
        :disabled="disabled"
      />
      <span :class="classes" :style="style" class="oxd-radio-input"></span>
      <template v-if="labelPosition === 'right'">
        <div class="oxd-radio-option-label">
          {{ optionLabel }}
        </div>
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Position, LABEL_POSITIONS, RIGHT} from './types';

export interface State {
  focused: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedProxy: any;
}

export default defineComponent({
  name: 'oxd-radio-input',
  inheritAttrs: false,
  props: {
    modelValue: {},
    style: {
      type: Object,
    },
    optionLabel: {
      type: String,
      default: '',
    },
    labelPosition: {
      type: String,
      default: RIGHT,
      validator: function(value: Position) {
        return LABEL_POSITIONS.indexOf(value) !== -1;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue', 'blur', 'focus', 'change'],

  data(): State {
    return {
      focused: false,
      checkedProxy: {},
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-radio-input': true,
        'oxd-radio-input--active': !this.focused,
        'oxd-radio-input--focus': this.focused,
        [`--label-${this.labelPosition}`]: true,
      };
    },
    labelClasses(): object {
      return {
        '--disabled': this.disabled,
        '--focus': this.focused,
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

<style src="./radio-input.scss" lang="scss" scoped></style>
