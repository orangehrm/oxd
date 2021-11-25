<template>
  <button type="button" :class="classes" :style="style">
    <slot name="icon">
      <oxd-icon v-if="iconName" :name="iconName" class="oxd-button-icon" />
    </slot>
    <slot name="label">
      {{ label }}
    </slot>
    <slot name="iconRight">
      <oxd-icon
        v-if="iconRightName"
        :name="iconRightName"
        class="oxd-button-icon"
      />
    </slot>
  </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {
  ButtonSize,
  ButtonType,
  SIZES,
  SIZE_MEDIUM,
  TYPES,
  TYPE_MAIN,
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
    iconName: {
      type: String,
    },
    iconRightName: {
      type: String,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-button': true,
        [`oxd-button--${this.size}`]: true,
        [`oxd-button--${this.displayType}`]: true,
      };
    },
  },
});
</script>

<style src="./button.scss" lang="scss" scoped></style>
