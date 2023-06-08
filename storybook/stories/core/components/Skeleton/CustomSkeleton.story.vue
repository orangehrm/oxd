<template>
  <oxd-grid :cols="4">
    <oxd-grid-item v-for="i in 12" :key="i">
      <oxd-skeleton :width="50" :height="50" circle animate />
      <oxd-skeleton :lines="3" animate />
    </oxd-grid-item>
  </oxd-grid>
</template>

<script>
import Grid from '@orangehrm/oxd/core/components/Grid/Grid';
import GridItem from '@orangehrm/oxd/core/components/Grid/GridItem';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';

export default {
  components: {
    'oxd-grid': Grid,
    'oxd-skeleton': Skeleton,
    'oxd-grid-item': GridItem,
  },
};
</script>
