<template>
  <tr :class="classes">
    <slot></slot>
  </tr>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-tr',

  props: {
    withBorder: {
      type: Boolean,
      default: true,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-table-row': true,
        'oxd-table-row--with-border': this.withBorder,
        'oxd-table-row--clickable': this.clickable,
      };
    },
  },
});
</script>

<style src="./table-row.scss" lang="scss" scoped></style>
