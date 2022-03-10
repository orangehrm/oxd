<template>
  <oxd-select-input
    v-bind="$attrs"
    :options="options"
    up-icon="chevron-up"
    down-icon="chevron-down"
  ></oxd-select-input>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';

export default defineComponent({
  name: 'oxd-table-select-input',
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  components: {
    'oxd-select-input': SelectInput,
  },
});
</script>

<style src="./table-select-input.scss" lang="scss" scoped></style>
