<template>
  <component :class="classes" :style="style" :is="tag"><slot></slot></component>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {TAGS, Tags, TAG_P} from './types';

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
  },

  computed: {
    classes(): object {
      return {
        'oxd-text': true,
        [`oxd-text--${this.tag}`]: true,
      };
    },
  },
});
</script>

<style src="./text.scss" lang="scss" scoped></style>
