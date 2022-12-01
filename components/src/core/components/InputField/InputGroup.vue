<template>
  <div :class="rootClasses">
    <slot name="label">
      <div class="oxd-input-group__label-wrapper">
        <oxd-icon
          v-if="labelIcon"
          :name="labelIcon"
          class="oxd-input-group__label-icon"
        />
        <oxd-label v-if="label" :id="id" :label="label" :class="labelClasses" />
        <oxd-text
          v-if="hint && hintPlacement === HINT_PLACEMENT_TOP"
          class="oxd-input-field-hint placement-top"
          :style="hintStyle"
          tag="p"
        >
          {{ '(' + hint + ')' }}
        </oxd-text>
      </div>
    </slot>
    <div :class="wrapperClasses">
      <slot></slot>
    </div>
    <slot name="message">
      <oxd-text v-if="message" :class="messageClasses" tag="span">
        {{ message }}
      </oxd-text>
    </slot>
    <oxd-text
      v-if="hint && hintPlacement === HINT_PLACEMENT_BOTTOM"
      class="oxd-input-field-hint placement-bottom"
      :style="hintStyle"
      tag="p"
    >
      {{ hint }}
    </oxd-text>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Label from '@orangehrm/oxd/core/components/Label/Label.vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import {HINT_PLACEMENT_TOP, HINT_PLACEMENT_BOTTOM} from './types';

export default defineComponent({
  name: 'oxd-input-group',

  components: {
    'oxd-label': Label,
    'oxd-text': Text,
    'oxd-icon': Icon,
  },

  data() {
    return {
      HINT_PLACEMENT_TOP: HINT_PLACEMENT_TOP,
      HINT_PLACEMENT_BOTTOM: HINT_PLACEMENT_BOTTOM,
    };
  },

  props: {
    label: {
      type: String,
    },
    labelIcon: {
      type: String,
    },
    hint: {
      type: String,
      default: null,
    },
    hintPlacement: {
      type: String,
      default: HINT_PLACEMENT_TOP,
    },
    hintStyle: {
      type: Object,
      default: () => ({}),
    },
    message: {
      type: String,
    },
    id: {
      type: String,
    },
    classes: {
      type: Object,
      default: () => {
        return {
          label: {},
          message: {},
          wrapper: {},
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
    wrapperClasses(): object {
      const {wrapper} = this.classes;
      return wrapper ? wrapper : {};
    },
  },
});
</script>

<style src="./input-group.scss" lang="scss" scoped></style>
