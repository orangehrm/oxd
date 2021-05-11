<template>
  <div :class="classes" role="row">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-card-tr',

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
