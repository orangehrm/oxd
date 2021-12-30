<template>
  <button
    :disabled="disabled"
    v-if="withContainer"
    type="button"
    :class="classes"
    @click="onClick"
    :tooltip="tooltip"
    :flow="flow"
  >
    <oxd-icon :class="{'--disabled': disabled}" :name="name" />
  </button>
  <oxd-icon
    v-else
    :name="name"
    :class="{'oxd-icon-button__icon': true, '--disabled': disabled}"
    @click="onClick"
    :tooltip="tooltip"
    :flow="flow"
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
    disabled: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: null,
    },
    flow: {
      type: String,
      default: 'up',
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
      e.preventDefault();
      this.$emit('click', e);
    },
  },
});
</script>

<style src="./icon.scss" lang="scss" scoped></style>
