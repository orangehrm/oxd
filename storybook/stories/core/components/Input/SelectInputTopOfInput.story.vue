<template>
  <oxd-select :options="options" v-model="value">
    <template v-slot:topOfInput>
      <span class="top-of-input-label">{{ topOfInputLabel }}</span>
    </template>
  </oxd-select>
</template>

<script>
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput';

export default {
  data() {
    return {
      value: '',
      topOfInputLabel: 'Location',
      options: [
        {id: 1, label: 'New York'},
        {id: 2, label: 'London'},
        {id: 3, label: 'Tokyo'},
        {id: 4, label: 'Paris'},
        {id: 5, label: 'Sydney'},
        {id: 6, label: 'Berlin'},
      ],
    };
  },

  components: {
    'oxd-select': SelectInput,
  },
};
</script>

<style scoped>
.top-of-input-label {
  position: absolute;
  top: 6px;
  left: 8px;
  font-size: 11px;
  color: #6c757d;
  font-weight: 400;
  z-index: 1;
  pointer-events: none;
  line-height: 1;
}
</style>
