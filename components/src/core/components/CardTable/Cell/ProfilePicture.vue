<template>
  <oxd-skeleton
    v-if="isLoading"
    circle
    animate
    width="2.8rem"
    height="2.8rem"
  ></oxd-skeleton>
  <oxd-profile-pic
    v-else
    :size="profilePicture.size"
    :link="profilePicture.link"
    :imageSrc="profilePicture.src"
    :link-mode="profilePicture.target"
    :header="profilePicture.header"
    :rowItem="profilePicture.rowItem"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import {SIZE_SMALL} from '../../ProfilePic/types';
import {cellMixin} from './cell-mixin';
import {TargetTypes, TARGET_SELF, TARGETS} from './types';
import {defineComponent, computed, ref, watchEffect} from 'vue';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic.vue';

export default defineComponent({
  name: 'oxd-table-cell-profile-pic',
  inheritAttrs: false,
  mixins: [cellMixin],
  components: {
    'oxd-skeleton': Skeleton,
    'oxd-profile-pic': ProfilePic,
  },
  props: {
    link: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: null,
      validator: (value: TargetTypes) => {
        return TARGETS.indexOf(value) !== -1;
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    header: {
      type: Object,
      default: () => ({}),
    },
    rowItem: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const imgSrc = ref(null);
    const imgLoading = ref(false);

    const loadImage = (url: string): Promise<string | null> => {
      if (!url || !props.loading) return Promise.resolve(url);

      imgLoading.value = true;
      return new Promise(_resolve => {
        const resolve = (value: string | null) => {
          imgLoading.value = false;
          _resolve(value);
        };
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(null);
        img.src = url;
      });
    };

    const profilePicture = computed(() => {
      return {
        src: imgSrc.value,
        size: props.size ?? SIZE_SMALL,
        link:
          props.link && props.rowItem[props.link]
            ? props.rowItem[props.link]
            : null,
        target: props.target ?? TARGET_SELF,
        header: props.header,
        rowItem: props.rowItem,
      };
    });

    const isLoading = computed(() => props.loading || imgLoading.value);

    watchEffect(async () => {
      imgSrc.value = await loadImage(props.item as string);
    });

    return {
      isLoading,
      profilePicture,
    };
  },
});
</script>
