<template>
  <div>
    <hr
      v-if="areaOrientation == 'horizontal'"
      :class="classes"
      :style="style"
      role="separator"
      :aria-orientation="areaOrientation"
    />
    <div
      v-if="areaOrientation == 'vertical'"
      :class="classes"
      :style="style"
    ></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {
  AREA_ORIENTATION_VERTICAL,
  AREA_ORIENTATION_HORIZONTAL,
  AreaOrientation,
  ORIENTATION_TYPES,
} from './types';

export default defineComponent({
  name: 'oxd-divider',

  props: {
    style: {
      type: Object,
    },
    orientation: {
      type: String,
      default: AREA_ORIENTATION_HORIZONTAL,
      validator: function(value: AreaOrientation) {
        return ORIENTATION_TYPES.indexOf(value) !== -1;
      },
    },
  },

  computed: {
    classes(): object {
      return this.orientation == 'vertical'
        ? {'oxd-divider-vertical': true}
        : {'oxd-divider-horizontal': true};
    },
    areaOrientation(): AreaOrientation {
      if (this.orientation == 'vertical') {
        return AREA_ORIENTATION_VERTICAL;
      }
      return AREA_ORIENTATION_HORIZONTAL;
    },
  },
});
</script>

<style src="./divider.scss" lang="scss" scoped></style>
