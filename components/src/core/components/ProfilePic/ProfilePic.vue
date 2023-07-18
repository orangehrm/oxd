<template>
  <div :class="classes">
    <slot>
      <a v-if="link" :href="link" :target="linkMode">
        <span
          class="img-tag"
          :style="`background-image: url(${profileImage})`"
        ></span>
      </a>
      <span
        v-else
        class="img-tag"
        :style="`background-image: url(${profileImage})`"
      ></span>
    </slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {
  SIZES,
  SIZE_MEDIUM,
  ImageSize,
  TargetTypes,
  TARGET_SELF,
  TARGETS,
} from './types';
import {defaultUser} from './images';
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
    link: {
      type: String,
      default: null,
    },
    linkMode: {
      type: String,
      default: TARGET_SELF,
      validator: (value: TargetTypes) => {
        return TARGETS.indexOf(value) !== -1;
      },
    },
  },
  computed: {
    classes(): object {
      return {
        'header-image': true,
        [`profile-image--${this.size}`]: true,
      };
    },
    profileImage(): string {
      return this.imageSrc ? this.imageSrc : this.userPlaceholderImage;
    },
    userPlaceholderImage() {
      return defaultUser.value;
    },
  },
});
</script>
<style lang="scss" scoped>
.header-image {
  .img-tag,
  :deep(img) {
    display: block;
    width: 2.8rem;
    height: 2.8rem;
    cursor: pointer;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: $oxd-background-light-gray-color;
  }
}

.header-image.profile-image--medium {
  .img-tag,
  :deep(img) {
    width: 3.15rem;
    height: 3.15rem;
  }
}

.header-image.profile-image--small {
  .img-tag,
  :deep(img) {
    width: 2.8rem;
    height: 2.8rem;
  }
}

.header-image.profile-image--extra-small {
  .img-tag,
  :deep(img) {
    width: 2.4rem;
    height: 2.4rem;
  }
}
</style>
