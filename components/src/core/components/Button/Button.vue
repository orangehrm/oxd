<template>
  <button type="button" :class="classes" :style="style" @click="onClick">
    {{ label }}
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

export default defineComponent({
  name: 'oxd-button',

  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
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
  },

  // https://v3.vuejs.org/guide/migration/v-on-native-modifier-removed.html#overview
  emits: ['click'],

  computed: {
    classes(): object {
      return {
        'oxd-button': true,
        [`oxd-button--${this.size}`]: true,
        [`oxd-button--${this.type}`]: true,
      };
    },
  },

  methods: {
    onClick(e: Event) {
      e.stopPropagation();
      e.preventDefault();
      this.$emit('click', e);
    },
  },
});
</script>

<style src="./button.scss" lang="scss" scoped></style>
