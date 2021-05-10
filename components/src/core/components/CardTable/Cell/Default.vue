<template>
  <div v-if="showHeader" class="oxd-table-card-cell">
    <div class="header">
      {{ header.title }}
    </div>
    <div class="data">
      {{ item }}
    </div>
  </div>
  <template v-else>
    {{ item }}
  </template>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {cellMixin} from './cell-mixin';

export default defineComponent({
  name: 'oxd-table-cell-default',

  mixins: [cellMixin],

  props: {
    item: {
      required: true,
    },
  },

  computed: {
    showHeader(): boolean {
      return !(
        this.screenState.screenType === 'lg' ||
        this.screenState.screenType === 'xl'
      );
    },
  },
});
</script>

<style src="./default.scss" lang="scss" scoped></style>
