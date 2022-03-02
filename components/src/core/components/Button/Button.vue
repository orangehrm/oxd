<template>
  <button
    type="button"
    :class="classes"
    :style="style"
    :tooltip="tooltip"
    :flow="flow"
    @mousedown="mouseDown"
  >
    <slot name="icon">
      <oxd-icon
        v-if="iconName"
        :name="iconName"
        :size="iconSize"
        :style="iconStyle"
        class="oxd-button-icon"
      />
    </slot>
    <div class="oxd-button-label-wrapper">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <slot name="iconRight">
      <oxd-icon
        v-if="iconRightName"
        :name="iconRightName"
        :size="iconRightSize"
        class="oxd-button-icon oxd-button-icon-right"
      />
    </slot>
  </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {
  ButtonSize,
  ButtonType,
  TooltipPosition,
  SIZES,
  SIZE_MEDIUM,
  TYPES,
  TYPE_MAIN,
  TOOLTIP_TOP,
  TOOLTIP_POSITIONS,
} from './types';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'oxd-button',

  components: {
    'oxd-icon': Icon,
  },

  props: {
    label: {
      type: String,
      required: true,
    },
    displayType: {
      type: String,
      default: TYPE_MAIN,
      validator: function(value: ButtonType) {
        return TYPES.indexOf(value) !== -1;
      },
    },
    size: {
      type: String,
      default: SIZE_MEDIUM,
      validator: function(value: ButtonSize) {
        return SIZES.indexOf(value) !== -1;
      },
    },
    style: {
      type: Object,
    },
    iconStyle: {
      type: Object,
    },
    iconName: {
      type: String,
    },
    iconSize: {
      type: String,
      default: SIZE_MEDIUM,
      validator: (value: ButtonSize) => {
        return SIZES.indexOf(value) !== -1;
      },
    },
    iconRightSize: {
      type: String,
      default: SIZE_MEDIUM,
      validator: (value: ButtonSize) => {
        return SIZES.indexOf(value) !== -1;
      },
    },
    iconRightName: {
      type: String,
    },
    tooltip: {
      type: String,
      default: null,
    },
    flow: {
      type: String,
      default: TOOLTIP_TOP,
      validator: (value: TooltipPosition) => {
        return TOOLTIP_POSITIONS.indexOf(value) !== 1;
      },
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-button': true,
        [`oxd-button--${this.size}`]: true,
        [`oxd-button--${this.displayType}`]: true,
        'with-icon': this.iconName || this.iconRightName,
      };
    },
  },

  methods: {
    mouseDown(e: Event) {
      e.preventDefault();
    },
  },
});
</script>

<style src="./button.scss" lang="scss" scoped></style>
