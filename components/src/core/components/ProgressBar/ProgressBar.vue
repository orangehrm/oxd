<template>
  <div v-if="show" class="oxd">
    <div class="modal progress-modal">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
          </div>
          <div class="modal-body">
            <div class="progress linear-progress">
              <div class="indeterminate"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

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
  },
});
</script>

<style src="./brogressBar.scss" lang="scss" scoped></style>
