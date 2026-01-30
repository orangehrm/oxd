<template>
  <oxd-input v-model="value">
    <template v-slot:topOfInput>
      <span class="top-of-input-label">{{ topOfInputLabel }}</span>
    </template>
  </oxd-input>
</template>

<script>
import Input from '@orangehrm/oxd/core/components/Input/Input';

export default {
  data() {
    return {
      value: '',
      topOfInputLabel: 'Label',
    };
  },
  components: {
    'oxd-input': Input,
  },
};
</script>

