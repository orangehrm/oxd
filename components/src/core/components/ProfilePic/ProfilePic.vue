<template>
  <div :class="classes">
    <slot>
      <img :src="imageSrc ? imageSrc : userPlaceholderImage" />
    </slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {SIZES, SIZE_MEDIUM, ImageSize} from './types';
import {defaultUser} from './../List/images';
export default defineComponent({
  name: 'oxd-profile-pic',
  props: {
    size: {
      type: String,
      default: SIZE_MEDIUM,
      validator: function(value: ImageSize) {
        return SIZES.indexOf(value) !== -1;
      },
    },
    style: {
      type: Object,
    },
    imageSrc: {
      type: String,
      default: null,
    },
  },
  computed: {
    classes(): object {
      return {
        'header-image': true,
        [`profile-image--${this.size}`]: true,
      };
    },
    userPlaceholderImage() {
      return defaultUser.value;
    },
  },
});
</script>
<style lang="scss" scoped>
.header-image :deep(img) {
  border-radius: 50%;
  height: auto;
  cursor: pointer;
}

.header-image.profile-image--medium :deep(img) {
  width: 3.15rem;
  max-height: 3.15rem;
}

.header-image.profile-image--small :deep(img) {
  width: 2.8rem;
  max-height: 2.8rem;
}
</style>
