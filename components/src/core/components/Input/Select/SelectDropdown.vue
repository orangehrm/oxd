<template>
  <div role="listbox" class="oxd-select-dropdown">
    <div class="oxd-select-dropdown-inner">
      <oxd-select-option v-if="empty && !loading">
        No results found
      </oxd-select-option>
      <oxd-select-option
        v-if="loading"
        class="justify-center oxd-select-input-spinner-wrapper"
      >
        <oxd-loading-spinner :with-container="false" />
      </oxd-select-option>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SelectOption from '@orangehrm/oxd/core/components/Input/Select/SelectOption.vue';
import Spinner from '@orangehrm/oxd/core/components/Loader/Spinner.vue';

export default defineComponent({
  name: 'oxd-select-dropdown',

  components: {
    'oxd-select-option': SelectOption,
    'oxd-loading-spinner': Spinner,
  },

  props: {
    empty: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style src="./select-input.scss" lang="scss" scoped></style>
