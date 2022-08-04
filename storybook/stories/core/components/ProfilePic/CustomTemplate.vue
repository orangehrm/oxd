<template>
  <oxd-profile-pix>
    <img :src="data.imageSrc" />
  </oxd-profile-pix>
</template>

<script>
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic';
export default {
  components: {
    'oxd-profile-pix': ProfilePic,
  },
  data() {
    return {
      data: {
        imageSrc: require('@orangehrm/oxd/assets/images/user-default-400.png'),
      },
    };
  },
};
</script>
