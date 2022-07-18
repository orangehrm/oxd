<template>
  <div class="oxd-switch-wrapper">
    <label :class="{'--disabled': disabled, '--full-width': useFullWidth}">
      <template v-if="labelPosition === 'left'">
        {{ optionLabel }}
        <oxd-help-popup-icon
          class="left"
          v-if="helpText"
          :help-text="helpText"
          :help-position="helpTextPosition"
        />
      </template>
      <input
        type="checkbox"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        v-bind="$attrs"
        v-model="checked"
        :true-value="trueValue"
        :false-value="falseValue"
        :disabled="disabled"
      />
      <span :class="classes" :style="style"> </span>
      <template v-if="labelPosition === 'right'">
        {{ optionLabel }}
        <oxd-help-popup-icon
          v-if="helpText"
          :help-text="helpText"
          :help-position="helpTextPosition"
        />
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Position, LABEL_POSITIONS, RIGHT} from './types';
import HelpPopupIcon from '@orangehrm/oxd/core/components/Icon/HelpPopupIcon.vue';
import {
  BOTTOM_RIGHT,
  HELP_POSITIONS,
  HelpPosition,
} from '@orangehrm/oxd/core/components/Icon/types';

export interface State {
  focused: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedProxy: any;
}

export default defineComponent({
  name: 'oxd-switch-input',
  components: {
    'oxd-help-popup-icon': HelpPopupIcon,
  },
  inheritAttrs: false,
  props: {
    modelValue: {},
    style: {
      type: Object,
    },
    disabled: {
      type: Boolean,
      default: false,
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
    helpText: {
      type: String,
      default: '',
    },
    trueValue: {
      type: [String, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Boolean],
      default: false,
    },
    helpTextPosition: {
      type: String,
      default: BOTTOM_RIGHT,
      validator: (value: HelpPosition) => {
        return HELP_POSITIONS.indexOf(value) !== -1;
      },
    },
    useFullWidth: {
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
        'oxd-switch-input': true,
        'oxd-switch-input--active': !this.focused,
        'oxd-switch-input--focus': this.focused,
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
