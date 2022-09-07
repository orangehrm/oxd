<template>
  <oxd-multiselect-input :options="options" v-model="value">
    <template v-slot:chips="{ data }"><span style="margin-left: 10px;">({{data.id}})</span> </template>
  </oxd-multiselect-input>
</template>

<script>
import MultiSelectInput from '@orangehrm/oxd/core/components/Input/MultiSelect/MultiSelectInput';

export default {
  data() {
    return {
      value: [],
      options: [
        {id: 1, label: 'HR Admin'},
        {id: 2, label: 'ESS User'},
        {id: 3, label: 'Supervisor'},
        {
          id: 5,
          label: 'Employee',
        },
        {
          id: 6,
          label: 'Assistant Manager',
        },
      ],
    };
  },

  components: {
    'oxd-multiselect-input': MultiSelectInput,
  },
};
</script>
