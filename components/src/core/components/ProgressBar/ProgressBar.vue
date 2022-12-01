<template>
  <div v-if="show" class="oxd-overlay">
    <div class="oxd">
      <div class="progress-bar-modal">
        <div class="modal-dialog modal-sm">
          <div class="progress-modal-content">
            <div class="progress-modal-header">
              <h5 class="progress-modal-title">{{ title }}</h5>
            </div>
            <div class="progress-modal-body">
              <div class="progress linear-progress-vue">
                <div class="indeterminate" v-if="!isValuedProgress"></div>
                <div
                  class="loader"
                  :style="{'--value': progressPercentage}"
                  v-if="isValuedProgress"
                ></div>
              </div>
              <span class="loader-value" v-if="isValuedProgress">
                {{ progressPercentage }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';

export default defineComponent({
  name: 'oxd-progress-bar',

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    progressValue: {
      type: Number,
      default: undefined,
    },
  },

  setup: function(props) {
    const isValuedProgress = ref<boolean>(false);
    const progressPercentage = ref<string>('');
    const init = () => {
      isValuedProgress.value = props.progressValue != undefined ? true : false;

      if (props.progressValue || props.progressValue === 0) {
        if (props.progressValue < 0 || props.progressValue === 0) {
          progressPercentage.value = '0%';
        } else if (props.progressValue > 100) {
          progressPercentage.value = '100%';
        } else {
          progressPercentage.value = props.progressValue.toString() + '%';
        }
      }
    };
    init();

    watch(
      () => props.progressValue,
      () => {
        init();
      },
      {
        immediate: true,
      },
    );

    return {
      isValuedProgress,
      progressPercentage,
    };
  },
});
</script>

<style src="./brogressBar.scss" lang="scss" scoped></style>
