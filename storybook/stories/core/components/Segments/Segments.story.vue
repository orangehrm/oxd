<template>
  <div>
    <oxd-segments
      :options="options"
      v-model="modelValue"
      :id="id"
      :style="style"
      :disabled="disabled"
    />
      <br />
     <p>Selected value: {{ modelValue }}</p>
  </div>
</template>

<script>
import Segments from '@orangehrm/oxd/core/components/Segments/Segments';

export default {
  props: {
    options: Array,
    id: '',
    style: {},
    disabled: false,
    modelValue:{},
  },

  components: {
    'oxd-segments': Segments,
  },
};
</script>
