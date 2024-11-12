<template>
    <oxd-select :options="options" v-model="value">
      <template v-slot:option="{ data }"> 
        <oxd-icon name="eye-fill"  /> 
          <span >{{ data.label }}</span>
         </template>
    </oxd-select>
  </template>
  
  <script>
  import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput';
  import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
  
  export default {
    data() {
      return {
        value: '',
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
      'oxd-select': SelectInput,
      'oxd-icon': Icon,
    },
  };
  </script>
  