<template>
  <div class="header-image">
    <slot> </slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  name: 'oxd-profile-pic',
});
</script>
<style lang="scss" scoped>
.header-image::v-deep img {
  border-radius: 50%;
  width: 3.75rem;
  height: auto;
  max-height: 3.75rem;
  cursor: pointer;
}
</style>
