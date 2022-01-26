<template>
  <oxd-form-dynamic :form="formConfigs"></oxd-form-dynamic>
</template>

<script>
import {defineComponent, ref} from 'vue';
import FormDynamic from '@orangehrm/oxd/core/components/FormDynamic/FormDynamic';

export default defineComponent({
  name: 'DefaultFormDynamic',
  components: {
    'oxd-form-dynamic': FormDynamic,
  },
  setup() {
    const formConfigs = ref({
      columnsPerRow: 2,
      elements: [
        {
          label: 'Select resume',
          type: "oxd-file-input",
          props: {
            isFileArray: true,
          },
          column: 1
        },
        {
          label: 'First Name',
          type: "oxd-input",
          props: {
          },
        },
        {
          label: 'Middle Name',
          type: "oxd-input",
          props: {
          },
        },
        {
          label: 'Last Name',
          type: "oxd-input",
          props: {
          },
        },
        {
          label: 'Email',
          type: "oxd-input",
          props: {
          },
        },
        {
          label: 'Contact Number',
          type: "oxd-input",
          props: {
          },
        },
        {
          label: 'LinkedIn',
          type: "oxd-input",
          props: {
          },
        },
        {
          label: 'Vacancy',
          type: "oxd-select-input",
          props: {
            "hide-dropdown-default-label": true,
            options: []
          }
        },
        {
          label: 'Date of Application',
          type: "oxd-date-input",
          props: {
            placeholder: 'dd/mm/yyyy',
          }
        },
        {
          label: 'Keywords',
          type: "oxd-input",
          props: {
            placeholder: 'Enter comma separate keywords...'
          },
        },
        {
          label: 'Noted',
          type: "oxd-textarea",
          props: {
            placeholder: 'Enter any other notes about the candidate'
          },
        },
      ]
    })
    return {
      formConfigs,
    }
  }
});
</script>
