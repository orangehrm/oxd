<template>
  <oxd-profile-pic
    :size="profilePicture.size"
    :imageSrc="profilePicture.src"
    :link="profilePicture.link"
    :link-mode="profilePicture.target"
  />
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic.vue';
import {SIZE_SMALL} from '../../ProfilePic/types';
import {cellMixin} from './cell-mixin';
import {TargetTypes, TARGET_SELF, TARGETS} from './types';

export default defineComponent({
  name: 'oxd-table-cell-profile-pic',
  mixins: [cellMixin],
  components: {
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
        return TARGETS.indexOf(value) !== 1;
      },
    },
  },
  setup(props) {
    const profilePicture = computed(() => {
      return {
        src: props.item ?? null,
        size: props.size ?? SIZE_SMALL,
        link: props.link ?? null,
        target: props.target ?? TARGET_SELF,
      };
    });
    return {
      profilePicture,
    };
  },
});
</script>
