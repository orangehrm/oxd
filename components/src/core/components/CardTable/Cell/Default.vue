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
    <a v-if="rowItem.link && clickableCell" :href="rowItem.link" :target="linkMode">{{ item }}</a>
    <span v-else>{{ item }}</span>
  </template>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {DEVICE_LG, DEVICE_XL} from '../../../../composables/useResponsive';
import {cellMixin} from './cell-mixin';
import {TargetTypes, TARGET_SELF, TARGETS} from './types';

export default defineComponent({
  name: 'oxd-table-cell-default',

  mixins: [cellMixin],

  props: {
    item: {
      required: true,
    },
    clickableCell: {
      type: Boolean,
      default: false,
    },
    linkMode: {
      type: String,
      default: TARGET_SELF,
      validator: (value: TargetTypes) => {
        return TARGETS.indexOf(value) !== 1;
      },
    },
    rowItem: {
      type: Object,
      default: () => ({
        link: null
      })
    },
  },

  computed: {
    showHeader(): boolean {
      return !(
        this.screenState.screenType === DEVICE_LG ||
        this.screenState.screenType === DEVICE_XL
      );
    }
  },
});
</script>

<style src="./default.scss" lang="scss" scoped></style>
