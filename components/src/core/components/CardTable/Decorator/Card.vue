<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {decoratorMixin} from './decorator-mixin';

export default defineComponent({
  name: 'oxd-table-decorator-card',

  mixins: [decoratorMixin],

  computed: {
    classes(): object {
      return {
        'oxd-table-decorator-card': true,
      };
    },
  },
});
</script>

<style src="./card.scss" lang="scss" scoped></style>
