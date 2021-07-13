<template>
  <div role="listbox" class="oxd-select-dropdown">
    <oxd-select-option v-if="empty">
      No results found
    </oxd-select-option>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SelectOption from '@orangehrm/oxd/core/components/Input/Select/SelectOption.vue';

export default defineComponent({
  name: 'oxd-select-dropdown',

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

<style src="./select-input.scss" lang="scss" scoped></style>
