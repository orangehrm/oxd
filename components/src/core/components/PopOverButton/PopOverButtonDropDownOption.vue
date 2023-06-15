<template>
  <div
    @mousedown="onClick"
    role="option"
    class="oxd-pop-over-button-drop-down-option"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-pop-over-button-drop-down-option',
  setup(_, {emit}) {
    const onClick = () => {
      emit('select');
    };

    return {
      onClick,
    };
  },
});
</script>

<style src="./pop-over-button.scss" scoped lang="scss"></style>
