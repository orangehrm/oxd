<template>
  <oxd-table-cell-default>
    <template #body="{row, cell, header}">
      <a
        :href="row.link || '#'"
        :target="header.target || '_self'"
        class="oxd-table-cell-link "
      >
        {{ cell }}
      </a>
    </template>
  </oxd-table-cell-default>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import DefaultCell from './Default.vue';

export default defineComponent({
  components: {
    'oxd-table-cell-default': DefaultCell,
  },
});
</script>

<style src="./link.scss" lang="scss" scoped></style>
