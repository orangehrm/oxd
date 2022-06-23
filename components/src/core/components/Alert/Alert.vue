<template>
  <div v-if="show" :class="classes" role="alert">
    <div :class="contentClasses">
      <oxd-icon :name="iconName" class="oxd-alert-content-icon" />
      <oxd-text tag="p" class="oxd-alert-content-text">
        {{ message }}
      </oxd-text>
    </div>
    <div :class="actionClasses">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {AlertType, TYPE_DEFAULT, TYPES, ICON_MAP} from './types';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
export default defineComponent({
  name: 'oxd-alert',

  components: {
    'oxd-text': Text,
    'oxd-icon': Icon,
  },

  props: {
    type: {
      type: String,
      default: TYPE_DEFAULT,
      validator: function(value: AlertType) {
        return TYPES.indexOf(value) !== -1;
      },
    },
    message: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-alert': true,
        [`oxd-alert--${this.type}`]: true,
        'oxd-alert--compact': this.compact,
      };
    },
    contentClasses(): object {
      return {
        'oxd-alert-content': true,
        [`oxd-alert-content--${this.type}`]: true,
        'oxd-alert-content--compact': this.compact,
      };
    },
    actionClasses(): object {
      return {
        'oxd-alert-action': true,
        'oxd-alert-action--compact': this.compact,
      };
    },
    iconName(): string {
      return this.icon ? this.icon : ICON_MAP[this.type as AlertType];
    },
  },
});
</script>

<style src="./alert.scss" lang="scss" scoped></style>
