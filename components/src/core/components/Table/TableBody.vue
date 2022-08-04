<template>
  <tbody :class="classes">
    <slot></slot>
  </tbody>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-tbody',

  props: {
    withStrip: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-table-body': true,
        'oxd-table-body--with-strip': this.withStrip,
      };
    },
  },
});
</script>

<style src="./table-body.scss" lang="scss" scoped></style>
