<template>
  <component :class="classes" :style="style" :is="tag"><slot></slot></component>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {TAGS, Tags, TAG_P, TYPES, TextTypes} from './types';

export default defineComponent({
  name: 'oxd-text',

  props: {
    tag: {
      type: String,
      default: TAG_P,
      validator: function(value: Tags) {
        return TAGS.indexOf(value) !== -1;
      },
    },
    style: {
      type: Object,
    },
    type: {
      type: String,
      validator: function(value?: TextTypes) {
        if (value === undefined || value === null) {
          return true;
        }
        return TYPES.indexOf(value) !== -1;
      },
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-text': true,
        [`oxd-text--${this.tag}`]: true,
        [`oxd-text--${this.type}`]: this.type,
      };
    },
  },
});
</script>

<style src="./text.scss" lang="scss" scoped></style>
