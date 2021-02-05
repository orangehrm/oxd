<template>
  <div :class="rootClasses">
    <slot name="label">
      <oxd-label v-if="label" :label="label" :class="labelClasses" />
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

export default defineComponent({
  name: 'oxd-form-group',

  components: {
    'oxd-label': Label,
    'oxd-text': Text,
  },

  props: {
    label: {
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
        'oxd-form-group': true,
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
        'oxd-form-group__message': true,
      };
    },
  },
});
</script>

<style src="./form.scss" lang="scss" scoped></style>
