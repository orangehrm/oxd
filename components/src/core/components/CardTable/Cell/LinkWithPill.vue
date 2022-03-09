<template>
  <oxd-table-cell-default>
    <template #body="{cell, row}">
      <a
        :href="link ? row[link] : '#'"
        :target="target"
        class="oxd-table-cell-link "
      >
        {{ cell }}
      </a>
      <div v-if="pillProperty" class="oxd-table-cell-pill">
      {{ getPillValue(row) }}
      </div>
    </template>
  </oxd-table-cell-default>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import DefaultCell from './Default.vue';
import {TargetTypes, TARGET_SELF, TARGETS} from './types';

export default defineComponent({
  components: {
    'oxd-table-cell-default': DefaultCell,
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPillValue(row: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value:any = null;

      if (this.pillProperty) {
        value = row;
        if (Array.isArray(this.pillProperty)) {
          this.pillProperty.forEach(property => {

            value = value?.[property];
          });
        } else {
          value = row[this.pillProperty];
        }
      }

      return value;
    },
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
    pillProperty: {
      type: [String, Array],
      default: null,
    },
  },
});
</script>

<style src="./link-with-pill.scss" lang="scss" scoped></style>
