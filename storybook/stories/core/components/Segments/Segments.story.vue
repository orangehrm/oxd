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
import {nanoid} from 'nanoid';

export default {
  data() {
    return {
      selectedSegment: null,
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
