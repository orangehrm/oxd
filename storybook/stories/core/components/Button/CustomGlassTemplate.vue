<template>
  <oxd-button
    label="Share Photos"
    :size="data.imageSize"
    :displayType="data.imageDisplayType"
  >
    <template v-slot:icon>
      <img :src="data.imageSrc" />
    </template>
  </oxd-button>
</template>

<script>
import Button from '@orangehrm/oxd/core/components/Button/Button';
import {
  SIZE_LARGE,
  TYPE_GLASS,
} from '@orangehrm/oxd/core/components/Button/types';
export default {
  components: {
    'oxd-button': Button,
  },
  data() {
    return {
      data: {
        imageSrc: require('@orangehrm/oxd/assets/images/cameraglass.png'),
        imageSize: SIZE_LARGE,
        imageDisplayType: TYPE_GLASS,
      },
    };
  },
};
</script>
