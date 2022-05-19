<template>
  <div>
    <oxd-input @input="onInput()" />
  </div>
</template>

<script>
import Input from '@orangehrm/oxd/core/components/Input/Input';

export default {
  data() {
    return {};
  },

  components: {
    'oxd-input': Input,
  },
  methods: {
    onInput() {
      alert('input');
    },
  },
};
</script>
