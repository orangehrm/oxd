<template>
  <div class="oxd-checkbox-wrapper">
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
      <span :class="classes" :style="style" class="oxd-checkbox-input">
        <oxd-icon class="oxd-checkbox-input-icon" :name="checkIcon" />
      </span>
      <template v-if="labelPosition === 'right'">
        {{ optionLabel }}
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Position, LabelPositions} from './types';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export interface State {
  focused: boolean;
  checkedProxy: any;
}

export default defineComponent({
  name: 'oxd-checkbox-input',
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
    checkIcon: {
      type: String,
      default: 'check',
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

  components: {
    'oxd-icon': Icon,
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
        'oxd-checkbox-input': true,
        'oxd-checkbox-input--active': !this.focused,
        'oxd-checkbox-input--focus': this.focused,
        'oxd-checkbox-input--error': this.hasError,
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

<style src="./checkbox-input.scss" lang="scss" scoped></style>
