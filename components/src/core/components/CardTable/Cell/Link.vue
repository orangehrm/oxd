<template>
  <oxd-table-cell-default>
    <template #body="{cell, row}">
      <oxd-skeleton v-if="loading" animate></oxd-skeleton>
      <a
        v-else
        :href="link ? row[link] : '#'"
        :target="target"
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
import {TargetTypes, TARGET_SELF, TARGETS} from './types';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';

export default defineComponent({
  components: {
    'oxd-skeleton': Skeleton,
    'oxd-table-cell-default': DefaultCell,
  },
  props: {
    link: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: TARGET_SELF,
      validator: (value: TargetTypes) => {
        return TARGETS.indexOf(value) !== -1;
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style src="./link.scss" lang="scss" scoped></style>
