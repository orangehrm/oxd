<template>
  <div class="oxd-progress-circle-outer-container" :style="cssData">
    <div class="oxd-progress-circle-container">
      <svg
        class="oxd-progress-circle-svg"
        xmlns="http://www.w3.org/2000/svg"
        :width="svgDimensions"
        :height="svgDimensions"
      >
        <circle
          class="oxd-progress-circle-ring-empty"
          :cx="radius"
          :cy="radius"
          :r="normalizedRadius"
          :stroke-width="normalizedStrokeWidth"
          fill="transparent"
          :style="emptyStroke"
        />
        <circle
          class="oxd-progress-circle-ring-fill"
          :cx="radius"
          :cy="radius"
          :r="normalizedRadius"
          :stroke-linecap="strokeLineCap"
          :stroke-width="normalizedStrokeWidth"
          fill="transparent"
          :stroke-dasharray="circumference + ' ' + circumference"
          :stroke-dashoffset="strokeDashoffset"
          :style="fillCustomStyles"
        />
      </svg>
      <div class="oxd-progress-circle-inner-content">
        <slot name="progressCircleInnerContent">
          <div
            class="oxd-progress-circle-default-inner-text"
            :style="getTextStyle()"
          >
            {{ normalizedValue }}%
          </div>
        </slot>
      </div>
    </div>

    <div class="oxd-progress-circle-bottom-content">
      <slot name="progressCircleBottomContent"> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';

export default defineComponent({
  name: 'circleProgress',

  props: {
    value: {
      type: Number as PropType<number>,
      default: 0,
    },
    radius: {
      type: Number,
      default: 40,
    },
    strokeWidth: {
      type: Number,
      default: 12,
    },
    strokeFillColor: {
      type: String,
    },
    strokeBackgroundColor: {
      type: String,
    },
    animation: {
      type: Boolean,
      default: true,
    },
    roundCorners: {
      type: Boolean,
      default: true,
    },
    rotation: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    normalizedStrokeWidth() {
      return this.strokeWidth > this.radius ? this.radius : this.strokeWidth;
    },
    normalizedValue() {
      let normalizedVal = this.value;
      if (this.value < 0) {
        normalizedVal = 0;
      }
      if (this.value > 100) {
        normalizedVal = 100;
      }
      normalizedVal = Number(normalizedVal.toFixed(2));

      return normalizedVal;
    },
    normalizedRadius() {
      return this.radius - this.normalizedStrokeWidth;
    },
    strokeLineCap() {
      return this.roundCorners === true ? 'round' : 'butt';
    },
    circumference() {
      return Math.round(2 * Math.PI * this.normalizedRadius);
    },
    strokeDashoffset() {
      return (
        this.circumference - (this.normalizedValue / 100) * this.circumference
      );
    },
    svgDimensions() {
      return this.radius * 2;
    },
    emptyStroke() {
      if (this.strokeBackgroundColor) {
        return {
          stroke: this.strokeBackgroundColor,
        };
      }
      return {};
    },
    fillCustomStyles() {
      const strokeFill = this.strokeFillColor
        ? {stroke: this.strokeFillColor}
        : {};
      const rotationFill = this.rotation
        ? {transform: `rotate(${this.rotation}deg)`}
        : {};
      const animationFill = this.animation === false ? {animation: 'none'} : {};
      return {...strokeFill, ...rotationFill, ...animationFill};
    },
    cssData() {
      return {
        '--stroke-dashoffset': this.strokeDashoffset,
        '--circumference': this.circumference,
        '--inner-content-width': this.normalizedRadius * 0.75 * 2 + 'px',
      };
    },
  },
  methods: {
    getTextStyle() {
      return {'font-size': Math.round(this.normalizedRadius * 0.35) + 'px'};
    },
  },
});
</script>
<style lang="scss" src="./ProgressCircle.scss" scoped></style>
