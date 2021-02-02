<template>
  <div>
    <oxd-label :label="label" />
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Label from '@orangehrm/oxd/core/components/Label/Label.vue';

export default {
  name: 'oxd-form-group',

  components: {
    'oxd-label': Label,
  },

  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
