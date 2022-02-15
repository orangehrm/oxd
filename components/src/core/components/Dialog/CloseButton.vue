<template>
  <button class="oxd-dialog-close-button d-flex align-center justify-center">
    <oxd-icon-button
      class="oxd-dialog-close-button-icon"
      :withContainer="false"
      :name="'x'"
    />
  </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';

export default defineComponent({
  name: 'oxd-dialog-close-button',
  components: {
    'oxd-icon-button': IconButton,
  },
});
</script>

<style src="./close-button.scss" lang="scss" scoped></style>
