<template>
  <ul>
    <li v-for="(item, i) in list" :key="i">
      <div class="oxd-bullet-point" :style="item.styles"></div>
      <slot :name="item.id"> </slot>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  BulletPointListItem,
} from "./types";

export default defineComponent({
  name: "BulletPointsComponent",
  props: {
    list: {
       type: Array as () => Array<BulletPointListItem>,
       required: true
    },
  },
});
</script>
<style src="./BulletPoints.scss" lang="scss" scoped></style>
