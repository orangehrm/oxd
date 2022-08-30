<template>
  <ul class="oxd-bullet-point-list">
    <li v-for="(item, i) in list" :key="i" class="oxd-bullet-point-item">
      <div
        class="oxd-bullet-point-vertical-line"
        :style="getElementStyles(i)"
      ></div>
      <div class="oxd-bullet-point-content">
        <div class="oxd-bullet-point" :style="item.styles"></div>
        <slot :name="item.id"> </slot>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {BulletPointListItem} from './types';

export default defineComponent({
  name: 'BulletPointsComponent',
  props: {
    list: {
      type: Array as () => Array<BulletPointListItem>,
      required: true,
    },
    lineColor: {
      type: String,
    },
  },
  data() {
    return {
      isLast: this.$props.list.length - 1,
    };
  },
  methods: {
    getElementStyles(index: number) {
      let customLineColor = {};
      if (this.$props.lineColor)
        customLineColor = {borderColor: this.$props.lineColor};
      if (this.isLast === 0) {
        return {display: 'none'};
      } else if (index === 0) {
        return {height: '50%', top: '50%', ...customLineColor};
      } else if (index === this.isLast) {
        return {height: '50%', ...customLineColor};
      }
      return {...customLineColor};
    },
  },
});
</script>
<style src="./BulletPoints.scss" lang="scss" scoped></style>
