<template>
  <oxd-table-cell-default>
    <template #body="{cell, row}">
      <a
        :href="link ? row[link] : '#'"
        :target="target"
        :class="linkClasses"
      >
        {{ cell }}
      </a>
      <div v-if="pillProperty" :class="pillClasses">
        {{ getPillValue(row) }}
      </div>
    </template>
  </oxd-table-cell-default>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import DefaultCell from './Default.vue';
import {TargetTypes, TARGET_SELF, TARGETS, RowItem} from './types';

export default defineComponent({
  components: {
    'oxd-table-cell-default': DefaultCell,
  },
  methods: {
    getPillValue(row: RowItem) {
      let value: string | Array = null;

      if (Array.isArray(this.pillProperty)) {
        this.pillProperty.forEach((property, index) => {
          if (index === 0) {
            value = row?.[property];
          } else {
            value = value?.[property];
          }
        });
      } else if (this.pillProperty) {
        value = row[this.pillProperty];
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
    pillInline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    linkClasses(): object {
      return {
        'oxd-table-cell-link': true,
        ['oxd-table-cell-link--inline-pill']: this.pillInline,
      };
    },
    pillClasses(): object {
      return {
        'oxd-table-cell-pill': true,
        ['oxd-table-cell-pill--inline']: this.pillInline,
      };
    },
  },
});
</script>

<style src="./link-with-pill.scss" lang="scss" scoped></style>
