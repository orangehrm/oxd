<template>
  <div>{{ title }}</div>
  <div
    v-focus-within
    class="oxd-card"
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
export default {
  name: 'oxd-card',

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
};
</script>

<style src="./card.scss" lang="scss" scoped></style>
