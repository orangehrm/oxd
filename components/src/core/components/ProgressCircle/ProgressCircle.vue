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
          :stroke-width="strokeWidth"
          fill="transparent"
          :style="emptyStroke"
        />
        <circle
          class="oxd-progress-circle-ring-fill"
          :cx="radius"
          :cy="radius"
          :r="normalizedRadius"
          :stroke-linecap="strokeLineCap"
          :stroke-width="strokeWidth"
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
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'circleProgress',

  props: {
    strokeWidth: {
      type: Number,
      default: 12,
    },
    rotation: {
      type: Number,
      default: 0,
    },
    radius: {
      type: Number,
      default: 40,
    },
    value: {
      type: Number,
      default: 0,
    },
    animation: {
      type: Boolean,
      default: true,
    },
    roundCorners: {
      type: Boolean,
      default: true,
    },
    emptyStrokeColor: {
      type: String,
    },
    fillStrokeColor: {
      type: String,
    },
  },
  computed: {
    normalizedValue() {
      return this.value < 0
        ? 0
        : this.value > 100
        ? 100
        : (this.value * 100) % 1 === 0
        ? this.value
        : parseFloat(this.value).toFixed(2);
    },
    strokeLineCap() {
      return this.roundCorners === true ? 'round' : 'butt';
    },
    normalizedRadius() {
      return this.radius - this.strokeWidth;
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
      if (this.emptyStrokeColor) {
        return {
          stroke: this.emptyStrokeColor,
        };
      }
      return {};
    },
    fillCustomStyles() {
      const strokeFill = this.fillStrokeColor
        ? {stroke: this.fillStrokeColor}
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
      return {'font-size': Math.round(this.normalizedRadius * 0.45) + 'px'};
    },
  },
});
</script>
<style lang="scss" src="./ProgressCircle.scss" scoped></style>
