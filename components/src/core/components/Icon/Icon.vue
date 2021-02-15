<template>
  <i :class="classes"></i>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'oxd-icon',

  props: {
    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    classes(): object {
      return {
        'oxd-icon': true,
        [`bi-${this.name}`]: true,
      };
    },
  },
});
</script>

<style src="./icon.scss" lang="scss" scoped></style>
