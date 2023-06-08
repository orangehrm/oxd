<template>
  <oxd-table-cell-default>
    <template #body="{cell}">
      <oxd-skeleton v-if="loading" animate></oxd-skeleton>
      <span v-else>
        {{ convertDate(cell) }}
      </span>
    </template>
  </oxd-table-cell-default>
</template>

<script lang="ts">
import {
  parseDate,
  formatDate,
  convertPHPDateFormat,
} from '../../../../utils/date';
import {enUS} from 'date-fns/locale';
import DefaultCell from './Default.vue';
import {defineComponent, PropType} from 'vue';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';

export default defineComponent({
  components: {
    'oxd-skeleton': Skeleton,
    'oxd-table-cell-default': DefaultCell,
  },
  props: {
    ioFormat: {
      type: String,
      default: 'Y-m-d',
    },
    displayFormat: {
      type: String,
      default: 'Y-m-d',
    },
    locale: {
      type: Object as PropType<Locale>,
      default: enUS,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    convertDate(date) {
      const parseFormat = convertPHPDateFormat(this.ioFormat);
      const displayFormat = convertPHPDateFormat(this.displayFormat);
      return formatDate(parseDate(date, parseFormat), displayFormat, {
        locale: this.locale,
      });
    },
  },
});
</script>
