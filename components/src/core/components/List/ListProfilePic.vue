<template>
  <oxd-profile-pix>
    <img :src="imageSrc" />
  </oxd-profile-pix>
</template>

<script>
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic';
export default {
  props: {
    imageSrc: {
      type: String,
      default: '',
    },
  },
  components: {
    'oxd-profile-pix': ProfilePic,
  },
};
</script>
