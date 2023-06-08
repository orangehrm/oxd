<template>
  <oxd-skeleton
    v-if="loading"
    circle
    animate
    width="2.8rem"
    height="2.8rem"
  ></oxd-skeleton>
  <oxd-profile-pic
    v-else
    :size="profilePicture.size"
    :imageSrc="profilePicture.src"
    :link="profilePicture.link"
    :link-mode="profilePicture.target"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import {SIZE_SMALL} from '../../ProfilePic/types';
import {cellMixin} from './cell-mixin';
import {TargetTypes, TARGET_SELF, TARGETS} from './types';
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
  },
  setup(props) {
    const profilePicture = computed(() => {
      return {
        src: props.item ?? null,
        size: props.size ?? SIZE_SMALL,
        link:
          props.link && props.rowItem[props.link]
            ? props.rowItem[props.link]
            : null,
        target: props.target ?? TARGET_SELF,
      };
    });
    return {
      profilePicture,
    };
  },
});
</script>
