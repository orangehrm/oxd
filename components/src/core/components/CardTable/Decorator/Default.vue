<template>
  <slot></slot>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {decoratorMixin} from './decorator-mixin';

export default defineComponent({
  name: 'oxd-table-decorator-default',

  mixins: [decoratorMixin],
});
</script>
