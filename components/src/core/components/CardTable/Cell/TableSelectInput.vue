<template>
  <oxd-skeleton v-if="loading" animate></oxd-skeleton>
  <oxd-select-input
    v-else
    up-icon="oxd-chevron-up"
    down-icon="oxd-chevron-down"
    dropdown-icon-size="xxx-small"
    v-bind="$attrs"
  ></oxd-select-input>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';

export default defineComponent({
  name: 'oxd-table-select-input',
  inheritAttrs: false,
  components: {
    'oxd-skeleton': Skeleton,
    'oxd-select-input': SelectInput,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style src="./table-select-input.scss" lang="scss" scoped></style>
