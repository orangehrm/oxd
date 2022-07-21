<template>
  <div>
    <p>Selected value: {{ selectedSegment }}</p>
    <oxd-segments
      :options="options"
      v-model="selectedSegment"
    />
  </div>
</template>

<script>
import Segments from '@orangehrm/oxd/core/components/Segments/Segments';

export default {
  data() {
    return {
      selectedSegment: {
        id: 1,
        label: 'Single Assign',
      },
    };
  },

  props: {
    options: Array,
  },

  components: {
    'oxd-segments': Segments,
  },
};
</script>
