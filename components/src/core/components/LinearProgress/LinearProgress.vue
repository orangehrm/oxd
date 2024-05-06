<template>
  <div class="oxd-linear-progress-wrapper">
    <div
      class="oxd-progress oxd-linear-progress-outer"
      :style="customProgressBarBackgroundStyles"
    >
      <div
        class="oxd-linear-progress-inner"
        :style="customProgressBarFillStyles"
      ></div>
    </div>
    <span
      v-if="showPercentageValue"
      class="oxd-linear-progress-value"
      :style="progressPercentageValueStyles"
    >
      {{ progressPercentage }}
    </span>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';

export default defineComponent({
  name: 'oxd-linear-progress',

  props: {
    progressValue: {
      type: Number,
      default: 0,
    },
    showPercentageValue: {
      type: Boolean,
      default: false,
    },
    progressBarHeight: {
      type: String as PropType<string>,
    },
    progressBarFillColor: {
      type: String as PropType<string>,
    },
    progressBarBackgroundColor: {
      type: String as PropType<string>,
    },
    progressPercentageValueStyles: {
      type: Object,
      default: () => ({}),
    },
  },

  setup: function(props) {
    const progressPercentage = computed(() => {
      if (props.progressValue || props.progressValue === 0) {
        if (props.progressValue < 0 || props.progressValue === 0) {
          return '0%';
        } else if (props.progressValue > 100) {
          return '100%';
        } else {
          return props.progressValue.toString() + '%';
        }
      }
      return '';
    });

    const customProgressBarFillStyles: object = computed(() => ({
      '--value': progressPercentage.value,
      ...(props.progressBarFillColor && {
        'background-color': props.progressBarFillColor,
      }),
      ...(props.progressBarHeight && {
        height: props.progressBarHeight,
      }),
    }));

    const customProgressBarBackgroundStyles: object = computed(() => ({
      ...(props.progressBarBackgroundColor && {
        'background-color': props.progressBarBackgroundColor,
      }),
      ...(props.progressBarHeight && {
        height: props.progressBarHeight,
      }),
    }));
    return {
      progressPercentage,
      customProgressBarFillStyles,
      customProgressBarBackgroundStyles,
    };
  },
});
</script>

<style src="./linearProgress.scss" lang="scss" scoped></style>
