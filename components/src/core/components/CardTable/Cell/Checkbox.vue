<template>
  <oxd-checkbox-input v-model="checkedItems" :value="index" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {cellMixin} from './cell-mixin';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';

export default defineComponent({
  name: 'oxd-table-cell-checkbox',

  mixins: [cellMixin],
  components: {'oxd-checkbox-input': CheckboxInput},
  props: {
    item: {
      required: true,
    },
    index: {
      required: true,
    },
  },

  computed: {},
});
</script>

<style src="./default.scss" lang="scss" scoped></style>
