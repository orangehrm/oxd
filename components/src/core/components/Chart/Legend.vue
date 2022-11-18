<template>
  <ul class="oxd-chart-legend" @click.stop>
    <li v-for="(dataPoint, index) in data" :key="dataPoint">
      <template v-if="labelStyles[index]">
        <span class="oxd-chart-legend-key" :style="keyStyles[index]"></span>
        <oxd-text
          tag="span"
          :title="labels[index]"
          :style="labelStyles[index]"
          @click="onClickKey(index)"
        >
          {{ labels[index] }}
        </oxd-text>
      </template>
    </li>
  </ul>
</template>

<script lang="ts">
import {DataPoint} from './types';
import {defineComponent, PropType} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';

export default defineComponent({
  name: 'oxd-chart-legend',
  components: {
    'oxd-text': Text,
  },
  emits: ['click'],
  props: {
    data: {
      type: Array as PropType<DataPoint[]>,
      default: () => [],
    },
  },
  data() {
    return {
      toggledIndices: [],
    };
  },
  computed: {
    labels() {
      return this.data.map(({label, legend}: DataPoint) => {
        if (legend && legend.enable) {
          return legend.label;
        }
        return label;
      });
    },
    keyStyles() {
      return this.data.map(({color}: DataPoint) => ({
        backgroundColor: color,
      }));
    },
    labelStyles() {
      return this.data.map((_, index: number) => {
        return {
          textDecoration:
            this.toggledIndices.indexOf(index) > -1 ? 'line-through' : '',
        };
      });
    },
  },
  methods: {
    onClickKey(index: number) {
      const _index = this.toggledIndices.indexOf(index);
      if (_index > -1) {
        this.toggledIndices.splice(_index, 1);
      } else {
        this.toggledIndices.push(index);
      }
      this.$emit('click', index);
    },
  },
});
</script>

<style src="./legend.scss" lang="scss" scoped></style>
