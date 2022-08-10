<template>
  <div role="listbox" class="oxd-select-dropdown">
    <div class="oxd-select-dropdown-inner">
      <oxd-select-option v-if="empty">
        No results found
      </oxd-select-option>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SelectOption from '@orangehrm/oxd/core/components/Input/Select/SelectOption.vue';

export default defineComponent({
  name: 'oxd-tree-select-dropdown',

  components: {
    'oxd-select-option': SelectOption,
  },

  props: {
    empty: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style src="./tree-select-input.scss" lang="scss" scoped></style>
