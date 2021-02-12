<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-table-decorator-card',

  computed: {
    classes(): object {
      return {
        'oxd-table-decorator-card': true,
      };
    },
  },
});
</script>

<style src="./card.scss" lang="scss"></style>
