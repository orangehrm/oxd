<template>
  <img class="header-image" :src="imageUrl" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  name: 'ProfilePic',
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.header-image {
  border-radius: 50%;
  width: 3.75rem;
  height: auto;
  max-height: 3.75rem;
  cursor: pointer;
}
</style>
