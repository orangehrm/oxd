<template>
  <div :class="rootClasses">
    <slot name="label">
      <div class="oxd-input-group__label-wrapper">
        <oxd-icon
          v-if="labelIcon"
          :name="labelIcon"
          class="oxd-input-group__label-icon"
        />
        <oxd-label v-if="label" :label="label" :class="labelClasses" />
      </div>
    </slot>
    <div>
      <slot></slot>
    </div>
    <slot name="message">
      <oxd-text v-if="message" :class="messageClasses" tag="span">
        {{ message }}
      </oxd-text>
    </slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Label from '@orangehrm/oxd/core/components/Label/Label.vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'oxd-input-group',

  components: {
    'oxd-label': Label,
    'oxd-text': Text,
    'oxd-icon': Icon,
  },

  props: {
    label: {
      type: String,
    },
    labelIcon: {
      type: String,
    },
    message: {
      type: String,
    },
    classes: {
      type: Object,
      default() {
        return {
          label: {},
          message: {},
        };
      },
    },
  },

  computed: {
    rootClasses(): object {
      return {
        'oxd-input-group': true,
      };
    },
    labelClasses(): object {
      return {
        ...this.classes.label,
      };
    },
    messageClasses(): object {
      return {
        ...this.classes.message,
        'oxd-input-group__message': true,
      };
    },
  },
});
</script>

<style src="./input-group.scss" lang="scss" scoped></style>
