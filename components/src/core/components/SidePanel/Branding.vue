<template>
  <a class="oxd-brand" :class="classes" :href="url">
    <div class="oxd-brand-icon">
      <img alt="orangehrm logo" :src="imageSrc" />
    </div>
    <div class="oxd-brand-text" :class="classes">
      <oxd-text tag="p" class="oxd-brand-text-main">Orange</oxd-text>
      <span><oxd-text tag="p" class="oxd-brand-text-sub">HRM</oxd-text></span>
    </div>
  </a>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';

export default defineComponent({
  name: 'oxd-branding',

  props: {
    url: {
      type: String,
      default: '/',
    },
    imageSrc: {
      type: String,
      default: '',
    },
    toggle: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    'oxd-text': Text,
  },

  computed: {
    classes(): object {
      return {
        toggled: this.toggle,
      };
    },
  },
});
</script>

<style src="./branding.scss" lang="scss" scoped></style>
