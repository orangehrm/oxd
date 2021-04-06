<template>
  <oxd-input type="password" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';

export default defineComponent({
  name: 'oxd-password-input',

  components: {
    'oxd-input': Input,
  },
});
</script>
