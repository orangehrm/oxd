<template>
  <oxd-icon-button
    :icon-styles="{
      color: '#fff',
    }"
    class="oxd-dialog-close-button"
    :name="'x'"
    :size="'extra-large'"
  />
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
