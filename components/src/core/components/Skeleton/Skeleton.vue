<template>
  <div
    v-for="line in lines"
    :key="line"
    :class="classes"
    :style="styles"
    v-bind="$attrs"
  ></div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-skeleton',

  inheritAttrs: false,

  props: {
    animate: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number],
      default: null,
    },
    width: {
      type: [String, Number],
      default: null,
    },
    lines: {
      type: Number,
      default: 1,
    },
    animateHighlighted: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        'oxd-skeleton': true,
        '--circle': this.circle,
        '--animate': this.animate,
        '--animate-highlighted': this.animateHighlighted,
      };
    },
    styles() {
      const width =
        typeof this.width === 'number' ? `${this.width}px` : this.width;
      const height =
        typeof this.height === 'number' ? `${this.height}px` : this.height;

      return {
        ...(width && {width}),
        ...(height && {height}),
      };
    },
  },
});
</script>

<style lang="scss" src="./skeleton.scss" scoped></style>
