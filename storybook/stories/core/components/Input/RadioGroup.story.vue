<template>
  <div>
    <oxd-radio-group
      :options="options"
      v-model="modelValue"
      :class="class"
      :id="id"
      :style="style"
      :disabled="disabled"
    />
    <br />
    <span>Selected value: {{ modelValue }}</span>
  </div>
</template>

<script>
import RadioGroup from '@orangehrm/oxd/core/components/Input/RadioGroup';

export default {
  props: {
    options: [],
    class: '',
    id: '',
    style: {},
    disabled: false,
    modelValue: '',
  },

  components: {
    'oxd-radio-group': RadioGroup,
  },
};
</script>
