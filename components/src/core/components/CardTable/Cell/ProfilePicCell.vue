<template>
  <oxd-profile-pic
    :size="profilePicObj.size"
    :imageSrc="profilePicObj.profilePic"
    :link="profilePicObj.link"
  />
</template>

<script lang="ts">
import {defineComponent, PropType, computed} from 'vue';
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic.vue';
import {ProfilePicItem} from './types';
import {SIZE_SMALL} from './../../ProfilePic/types';
import {cellMixin} from './cell-mixin';

export default defineComponent({
  name: 'oxd-table-cell-profile-pic',
  mixins: [cellMixin],
  components: {'oxd-profile-pic': ProfilePic},
  props: {
    rowItem: {
      type: Object as PropType<ProfilePicItem>,
      required: true,
    },
  },
  setup(props) {
    const profilePicObj = computed(() => {
      const initialObject = {
        profilePic: null,
        size: SIZE_SMALL,
        link: {
          url: null,
          target: null,
        },
      };
      for (const key in props.rowItem) {
        const value = props.rowItem[key];
        if (value) {
          initialObject[key] = value;
        }
      }
      return initialObject;
    });
    return {
      profilePicObj,
    };
  },
});
</script>
