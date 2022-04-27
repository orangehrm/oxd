<template>
  <oxd-select-input
    up-icon="oxd-chevron-up"
    down-icon="oxd-chevron-down"
    dropdown-icon-size="xxx-small"
  ></oxd-select-input>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';

export default defineComponent({
  name: 'oxd-table-select-input',
  components: {
    'oxd-select-input': SelectInput,
  },
});
</script>

<style src="./table-select-input.scss" lang="scss" scoped></style>
