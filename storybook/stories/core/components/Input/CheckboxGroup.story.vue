<template>
  <div>
    <oxd-checkbox-group
      :options="options"
      v-model="selectedValue"
      :class="class"
      :id="id"
      :style="style"
      :disabled="disabled"
    />
    <br />
    <span>Selected value: {{ selectedValue }}</span>
  </div>
</template>

<script>
import CheckboxGroup from '@orangehrm/oxd/core/components/Input/CheckboxGroup';

export default {
  data() {
    return {
      selectedValue: [],
    };
  },

  props: {
    options: [],
    class: '',
    id: '',
    style: {},
    disabled: false,
  },

  components: {
    'oxd-checkbox-group': CheckboxGroup,
  },
};
</script>
