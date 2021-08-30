<template>
  <i v-if="isBootstrapIcon" :class="classes"></i>
  <i v-else v-html="imageSVG" class="oxd-svg-icon"></i>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import icons from './icons';
export default defineComponent({
  name: 'oxd-icon',

  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    classes(): object {
      return {
        'oxd-icon': true,
        [`bi-${this.name}`]: true,
      };
    },
    isBootstrapIcon(): boolean {
      if (this.name.includes('oxd')) {
        return false;
      } else {
        return true;
      }
    },
    imageSVG(): string {
      if (Object.prototype.hasOwnProperty.call(icons, this.name)) {
        return icons[this.name].value;
      } else {
        return '';
      }
    },
  },
});
</script>

<style src="./icon.scss" lang="scss" scoped></style>
