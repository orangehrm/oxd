<template>
  <button v-if="withContainer" type="button" :class="classes" @click="onClick">
    <oxd-icon :name="name" />
  </button>
  <oxd-icon
    v-else
    :name="name"
    class="oxd-icon-button__icon"
    @click="onClick"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'oxd-icon-button',

  components: {
    'oxd-icon': Icon,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    withContainer: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['click'],

  computed: {
    classes(): object {
      return {
        'oxd-icon-button': true,
      };
    },
  },

  methods: {
    onClick(e: Event) {
      e.stopPropagation();
      e.preventDefault();
      this.$emit('click', e);
    },
  },
});
</script>

<style src="./icon.scss" lang="scss" scoped></style>
