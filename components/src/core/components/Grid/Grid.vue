<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-grid',

  props: {
    cols: {
      type: Number,
    },
  },

  computed: {
    className(): string {
      return `oxd-grid-${this.cols}`;
    },
  },
});
</script>

<style src="./grid.scss" lang="scss" scoped></style>

<style lang="scss">
@for $i from 1 through 8 {
  .--span-column-#{$i} {
    grid-column: span #{$i};
  }
}
</style>
