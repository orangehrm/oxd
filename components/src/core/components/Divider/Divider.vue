<template>
  <hr
    :class="classes"
    :style="style"
    role="separator"
    :aria-orientation="areaOrientation"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {AREA_ORIENTATION_HORIZONTAL, AreaOrientation} from './types';

export default defineComponent({
  name: 'oxd-divider',

  props: {
    style: {
      type: Object,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-divider': true,
      };
    },
    areaOrientation(): AreaOrientation {
      return AREA_ORIENTATION_HORIZONTAL;
    },
  },
});
</script>

<style src="./divider.scss" lang="scss" scoped></style>
