<template>
  <oxd-profile-pic size="small" :imageSrc="rowItem.profilePic" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ProfilePic from '@orangehrm/oxd/src/core/components/ProfilePic/ProfilePic.vue';
import {cellMixin} from './cell-mixin';

export default defineComponent({
  name: 'oxd-table-cell-profile-pic',
  mixins: [cellMixin],
  components: {'oxd-profile-pic': ProfilePic},
  props: {
    rowItem: {
      type: Object,
      required: true,
    },
  },
});
</script>
