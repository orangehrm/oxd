<template>
  <div>
    <oxd-checkbox-group
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
import CheckboxGroup from '@orangehrm/oxd/core/components/Input/CheckboxGroup';

export default {
  props: {
    options: [],
    class: '',
    id: '',
    style: {},
    disabled: false,
    modelValue: [],
  },

  components: {
    'oxd-checkbox-group': CheckboxGroup,
  },
};
</script>
