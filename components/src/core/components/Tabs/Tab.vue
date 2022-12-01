<template>
  <div v-show="selectedTabId === tab.id">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import {defineComponent, inject, PropType} from 'vue';
import {Tab} from './types';

export default defineComponent({
  name: 'oxd-tab',
  props: {
    tab: {
      type: Object as PropType<Tab>,
    },
  },
  setup: function() {
    const selectedTabId = inject('selectedTabId');
    return {
      selectedTabId,
    };
  },
});
</script>
