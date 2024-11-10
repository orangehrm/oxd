<template>
  <div :class="['oxd-checkbox-wrapper ', optionWrapperAdditionalClass]">
    <label
      :class="[
        {'--disabled': disabled},
        {
          'border-enabled': border,
          '--error': hasError && border && !disabled,
        },
      ]"
    >
      <template v-if="optionInfoIcon && optionInfoIconPosition === 'left'">
        <span class="oxd-optional-info-icon oxd-optional-info-icon-left">
          <oxd-icon
            :name="optionInfoIcon"
            :size="optionInfoIconSize"
            :style="optionInfoIconStyle"
            :tooltip="optionInfoMessage"
            class="optional-info-icon"
          />
        </span>
      </template>
      <template v-if="labelPosition === 'left'">
        <div class="oxd-checkbox-option-label">
          {{ optionLabel }}
        </div>
      </template>
      <input
        type="checkbox"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        :true-value="trueValue"
        :false-value="falseValue"
        :disabled="disabled"
        v-bind="$attrs"
        v-model="checked"
      />
      <span :class="classes" :style="style" class="oxd-checkbox-input">
        <oxd-icon
          class="oxd-checkbox-input-icon"
          :name="checkIcon"
          :size="checkIconSize"
        />
      </span>
      <template v-if="labelPosition === 'right'">
        <div class="oxd-checkbox-option-label">
          {{ optionLabel }}
        </div>
      </template>
      <template v-if="optionInfoIcon && optionInfoIconPosition === 'right'">
        <span class="oxd-optional-info-icon" v-if="optionInfoIcon">
          <oxd-icon
            class="optional-info-icon"
            :name="optionInfoIcon"
            :style="optionInfoIconStyle"
            :size="optionInfoIconSize"
            :tooltip="optionInfoMessage"
          />
        </span>
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Position, LABEL_POSITIONS, RIGHT} from './types';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export interface State {
  focused: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    disabled: {
      type: Boolean,
      default: false,
    },
    checkIcon: {
      type: String,
      default: 'oxd-check',
    },
    checkIconSize: {
      type: String,
      default: 'xx-small',
    },
    trueValue: {
      type: [String, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Boolean],
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
    optionWrapperAdditionalClass: {
      type: String,
    },
    optionInfoIcon: {
      type: String,
      default: '',
    },
    optionInfoIconStyle: {
      type: Object,
      default: () => ({}),
    },
    optionInfoIconSize: {
      type: String,
      default: 'small',
    },
    optionInfoMessage: {
      type: String,
      default: '',
    },
    optionInfoIconPosition: {
      type: String,
      default: RIGHT,
      validator: function(value: Position) {
        return LABEL_POSITIONS.indexOf(value) !== -1;
      },
    },
    border: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue', 'blur', 'focus', 'change'],

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
