<template>
  <i v-if="isBootstrapIcon" :class="classes"></i>
  <i v-else v-html="imageSVG" :class="svgClasses"></i>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {IconSize, ICON_SIZES, ICON_SIZE_MEDIUM} from '../Icon/types';
import icons from './icons';
export default defineComponent({
  name: 'oxd-icon',

  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: ICON_SIZE_MEDIUM,
      validator: function(value: IconSize) {
        return ICON_SIZES.indexOf(value) !== -1;
      },
    },
  },
  computed: {
    classes(): object {
      return {
        'oxd-icon': true,
        [`oxd-icon--${this.size}`]: true,
        [`bi-${this.name}`]: true,
      };
    },
    svgClasses(): object {
      return {
        'oxd-svg-icon': true,
        [`oxd-svg-icon--${this.size}`]: true,
      };
    },
    isBootstrapIcon(): boolean {
      return !this.name.includes('oxd');
    },
    imageSVG(): string {
      if (icons[this.name]?.value) {
        return icons[this.name].value;
      } else {
        return '';
      }
    },
  },
});
</script>

<style src="./icon.scss" lang="scss" scoped></style>
