<template>
  <div v-if="!showHeader" class="oxd-table-cell-card">
    <span class="header">
      {{ header.name }}
    </span>
    <span class="data">
      {{ item }}
    </span>
  </div>
  <template v-else>
    {{ item }}
  </template>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {cellMixin} from './cell-mixin';

export default defineComponent({
  name: 'oxd-table-cell-card',

  mixins: [cellMixin],

  props: {
    item: {
      required: true,
    },
  },

  computed: {
    showHeader(): boolean {
      const _screenType = this.screenType?.value;
      return _screenType === 'lg' || _screenType === 'xl';
    },
  },
});
</script>

<style src="./card-cell.scss" lang="scss" scoped></style>
