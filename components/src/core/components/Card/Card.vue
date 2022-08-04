<template>
  <div>{{ title }}</div>
  <div
    class="oxd-card"
    v-bind="$attrs"
    :class="[
      clickable && 'oxd-card--clickable',
      hasShadow && 'oxd-card--hasShadow',
    ]"
    @click="cardClick"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-card',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
    },
    clickable: {
      type: Boolean,
    },
    hasShadow: {
      type: Boolean,
    },
  },

  methods: {
    cardClick() {
      if (!this.clickable) return;
      this.$emit('click');
    },
  },
});
</script>

<style src="./card.scss" lang="scss" scoped></style>
