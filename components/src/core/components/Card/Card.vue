<template>
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

<script>
export default {
  props: {
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

<style lang="scss">
.oxd-card {
  display: flex;
  border: 1px solid var(--card-border-color);
  border-radius: var(--card-border-radius);
  outline: none;

  &--noBorder {
    border: none;
    &:focus,
    &:hover {
      border: none;
    }
  }

  &--hasHoverShadow:focus,
  &--hasHoverShadow:hover {
    box-shadow: var(--shadow-2);
  }

  &--hasShadow {
    box-shadow: var(--shadow-2);
  }

  &--clickable:hover,
  &--clickable:focus {
    box-shadow: var(--shadow-2);
    cursor: pointer;
  }
}
</style>
